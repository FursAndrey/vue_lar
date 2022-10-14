import {ref, computed} from 'vue';

export default function useAuthorSearchPosts(sortedPosts) {
    const searchAuthor = ref('');
    
    const authorSearch = computed(() => {
        return sortedPosts.value.filter(post => post.author.toLowerCase().includes(searchAuthor.value.toLowerCase()))
    })
    
    return {
        searchAuthor,
        authorSearch,
    }
}