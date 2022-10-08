<template>
    <div class="post">
        <div>
            <div>{{ post.id }}</div>
            <div><strong>Название:</strong> {{ post.title }}</div>
            <div><strong>Описание:</strong> {{ post.body }}</div>
            <div><strong>Автор:</strong> {{ post.author }}</div>
        </div>
        <div class="post__btns">
            <my-button @click="$router.push(`/post/${post.id}`)" v-if="this.isAllPosts">
                Открыть
            </my-button>
            <my-button @click="$emit('editPost', post.id)" style="margin: 0 15px;">
                Изменить
            </my-button>
            <my-button @click="$emit('removePost', post.id)">        
                Удалить
            </my-button>
        </div>
    </div>
</template>
  
<script>
    export default {
        props: {
            post: {
                type: Object,
                required: true,
            }
        },
        data() {
            return {
                isAllPosts: true,
            }
        },
        mounted() {
            let id = this.$route.params.id*1;
            this.isAllPosts = !Number.isInteger(id);
        }
    }
</script>
  
<style scoped>
    .post {
        padding: 15px;
        border: 2px solid rgb(66, 133, 51);
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 10px;
    }
    .post > div {
        display: flex;
        flex-direction: column;
    }
    .post__btns {
        flex-direction: unset !important;
    }
</style>