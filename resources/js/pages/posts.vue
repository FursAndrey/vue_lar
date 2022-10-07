<template>
    <h2>I'm posts page.</h2>
    <div class="functions">
        <my-button @click="showDialog">Создать пост</my-button>
    </div>
    <my-modal v-model:show="dialogVisible" @hideDialog="hideDialog">
        Form will here.
    </my-modal>
    
    <div class="content">
        <transition-group name="user-list">
            <post-item
                v-for="post in posts"
                :post="post"
                :key="post.id"
            />
        </transition-group>
        <!-- <post-item
            v-for="post in posts"
            :post="post"
            :key="post.id"
            @remove="$emit('remove', post)"
        /> -->
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