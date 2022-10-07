<template>
    <h2>I'm posts page.</h2>
    <div class="functions">
        <my-button @click="showDialog">Создать пост</my-button>
    </div>
    <my-modal v-model:show="dialogVisible" @hideDialog="hideDialog">
        <form @submit.prevent>
            <h4>Создание поста</h4>
            <my-input
                v-model="post.title"
                type="text"
                placeholder="Название"
            />
            <my-input
                v-model="post.body"
                type="text"
                placeholder="Описание"
            />
            <my-input
                v-model="post.author"
                type="text"
                placeholder="Автор"
            />
            <my-button style="margin-top: 15px" @click="createPost">
                Создать
            </my-button>
            <my-button style="margin-top: 15px; margin-left: 15px;" @click="hideDialog">
                Закрыть
            </my-button>
        </form>
    </my-modal>
    
    <div class="content">
        <transition-group name="user-list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
                @removePost="removePost"
            />
        </transition-group>
    </div>
</template>

<script>
    import axios from 'axios';
    import PostItem from "../components/PostItem";

    export default {
        components: {
            PostItem
        },
        data() {
            return {
                posts: [],
                dialogVisible: false,
                post: {
                    title: '',
                    body: '',
                    author: '',
                }
            }
        },
        async mounted() {
            let result = await axios.get('/api/post');
            this.posts = result.data;
        },
        methods: {
            showDialog() {
                this.dialogVisible = true;
            },
            hideDialog() {
                this.dialogVisible = false;
            },
            async createPost() {
                await axios.post('/api/post', {"title":this.post.title,"body":this.post.body,"author":this.post.author})
                    .then((response) => {
                        this.posts.push(response.data);
                        this.post = {
                            title: '',
                            body: '',
                            author: '',
                        }
                        this.dialogVisible = false;
                    })
                    .catch((error) => {
                        console.log('error');
                        console.log(error);
                    });
            },
            async removePost(postId) {
                await axios.delete('/api/post/'+postId)
                    .then((response) => {
                        this.posts = this.posts.filter(p => p.id !== response.data.id);
                    })
                    .catch((error) => {
                        console.log('error');
                        console.log(error);
                    });
            },
        }
    }
</script>

<style scoped>
    .functions{
        margin: 15px 0;
    }
    
    .user-list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .user-list-enter-active, .user-list-leave-active {
        transition: all 0.8s ease;
    }
    .user-list-enter-from, .user-list-leave-to {
        opacity: 0;
        transform: translateX(180px);
    }
    .user-list-move {
        transition: transform 0.8s ease;
    }
</style>