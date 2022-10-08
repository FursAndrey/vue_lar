<template>
    <h2>I'm post page.</h2>
    
    <post-item :post="post"/>
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
                postId: this.$route.params.id,
                post: {
                    title: '',
                    body: '',
                    author: '',
                }
            }
        },
        async mounted() {
            let result = await axios.get('/api/post/'+this.postId);
            this.post = result.data;
        },
    }
</script>

<style scoped>
</style>