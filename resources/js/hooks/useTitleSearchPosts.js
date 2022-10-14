import {ref, computed} from 'vue';

export default function useTitleSearchPosts(sortedPosts) {
    const searchTitle = ref('');
    
    const titleSearch = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchTitle.value.toLowerCase()))
    })
    
    return {
        searchTitle,
        titleSearch,
    }
}