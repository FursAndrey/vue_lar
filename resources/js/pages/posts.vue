<template>
    <h2>I'm posts page.</h2>
    <div class="functions">
        <my-button @click="showDialog">Создать пост</my-button>
    </div>
    <my-modal v-model:show="dialogVisible" @hideDialog="hideDialog">
        Form will here.
    </my-modal>
    <div class="content">
        <p v-for="post in posts">
            {{ post.body }}
        </p>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                posts: [],
                dialogVisible: false,
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
        }
    }
</script>

<style scoped>
    .functions{
        margin: 15px 0;
    }
</style>