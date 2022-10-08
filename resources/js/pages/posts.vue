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
            <my-button style="margin-top: 15px" @click="createPost" v-if="isNewPost">
                Сохранить
            </my-button>
            <my-button style="margin-top: 15px" @click="updatePost" v-else>
                Обновить
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
                @editPost="editPost"
            />
        </transition-group>
    </div>
    <div class="pagination">
        <div 
            class="page" 
            v-for="page in this.totalPages" 
            :key="page" 
            v-on:click="changePage(page)" 
            :class="{
                'current-page': currentPage === page,
            }"
            >
            {{ page }}
        </div>
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
                isNewPost: true,
                postId: '',
                post: {
                    title: '',
                    body: '',
                    author: '',
                },
                currentPage: 1,
                totalPages: 0,
            }
        },
        mounted() {
            this.getPosts();
        },
        methods: {
            showDialog() {
                this.dialogVisible = true;
            },
            hideDialog() {
                this.dialogVisible = false;
            },
            async getPosts() {
                let result = await axios.get('/api/post', { params: {'page': this.currentPage} });
                this.totalPages = Math.ceil(result.data.total / result.data.per_page);
                this.posts = result.data.data;
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
                        console.log('error createPost');
                        console.log(error);
                        console.log(this.post);
                    });
                this.isNewPost = true;
            },
            async removePost(postId) {
                await axios.delete('/api/post/'+postId)
                    .then((response) => {
                        this.posts = this.posts.filter(p => p.id !== response.data.id);
                    })
                    .catch((error) => {
                        console.log('error removePost');
                        console.log(error);
                    });
            },
            async editPost(postId) {
                this.showDialog();
                await axios.get('/api/post/'+postId)
                    .then((response) => {
                        this.isNewPost = false;
                        this.postId = postId;
                        this.post = response.data;
                    })
                    .catch((error) => {
                        console.log('error editPost');
                        console.log(error);
                    });
            },
            async updatePost() {
                await axios.put('/api/post/'+this.postId, {"title":this.post.title,"body":this.post.body,"author":this.post.author})
                    .then((response) => {
                        this.posts = this.posts.map((el) => {
                            return el.id !== response.data.id ? el : response.data;
                        });
                        this.post = {
                            title: '',
                            body: '',
                            author: '',
                        }
                        this.dialogVisible = false;
                        this.isNewPost = true;
                    })
                    .catch((error) => {
                        console.log('error updatePost');
                        console.log(error);
                    });
            },
            changePage(page) {
                this.currentPage = page;
            }
        },
        watch: {
            currentPage() {
                this.getPosts();
            }
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
    .user-list-enter-active {
        transition: all 0.8s ease;
    }
    .user-list-leave-active {
        transition: all 0.01s ease;
    }
    .user-list-enter-from, .user-list-leave-to {
        opacity: 0;
        transform: translateX(180px);
    }
    .user-list-move {
        transition: transform 0.8s ease;
    }
    .pagination {
        display: flex;
        margin-top: 15px;
    }
    .pagination > .page {
        font-size: 1.5rem;
        padding: 10px;
        border: 2px solid black;
        margin: 0 1px;
        border-radius: 10px;
        cursor: pointer;
    }    
    .pagination > .current-page {
        border: 2px solid green;
    }
</style>