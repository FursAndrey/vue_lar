<template>
    <h2>I'm page for composition API.</h2>
    <div class="functions">
        <my-select
            v-model="selectedSort"
            :options="sortOptions"
        />
    </div>
    <div class="search-block">
        <p style="text-align:center">Блок поиска</p>
        <div>
            <my-input
                v-model="searchTitle"
                type="text"
                placeholder="Поиск по названию"
            />
            <my-input
                v-model="searchBody"
                type="text"
                placeholder="Поиск по тексту"
            />
            <my-input
                v-model="searchAuthor"
                type="text"
                placeholder="Поиск по автору"
            />
        </div>
    </div>
    
    <div class="content">
        <transition-group name="user-list">
            <post-item
                v-for="post in authorSearch"
                :post="post"
                :key="post.id"
            />
        </transition-group>
    </div>
</template>

<script>
import {ref} from 'vue';
import PostItem from "../components/PostItem";

import usePosts from "../hooks/usePosts";
import useSortedPosts from "../hooks/useSortedPosts";
import useTitleSearchPosts from "../hooks/useTitleSearchPosts";
import useBodySearchPosts from "../hooks/useBodySearchPosts";
import useAuthorSearchPosts from "../hooks/useAuthorSearchPosts";

export default {
    components: {
        PostItem,
    },
    data() {
        return {
            sortOptions: [
                {value: 'id', name: 'По номеру'},
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
                {value: 'author', name: 'По имени автора'},
            ],
            postId: '',
        }
    },
    // methods: {
    //     removePost(postId) {
    //         console.log('deletePost');
    //         console.log(this);
    //         console.log(postId);
    //     }
    // },
    setup(props) {
        const {posts, currentPage, totalPages} = usePosts();
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchTitle, titleSearch, } = useTitleSearchPosts(sortedPosts);
        const {searchBody, bodySearch, } = useBodySearchPosts(titleSearch);
        const {searchAuthor, authorSearch, } = useAuthorSearchPosts(bodySearch);

        return {
            posts,
            totalPages,
            currentPage,

            sortedPosts,
            selectedSort,

            searchTitle, 
            searchBody, 
            searchAuthor, 
            titleSearch, 
            bodySearch, 
            authorSearch,
        }
    }
}
</script>

<style scoped>
.functions{
    margin: 15px 0;
}
.search-block {
    border-radius: 10px;
    padding: 20px;
    border: 2px solid green;
}
.search-block > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.search-block > div > input {
    width: 30%;
}
.user-list-move {
    transition: transform 0.8s ease;
}
</style>