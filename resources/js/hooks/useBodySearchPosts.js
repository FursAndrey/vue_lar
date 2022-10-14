import {ref, computed} from 'vue';

export default function useBodySearchPosts(sortedPosts) {
    const searchBody = ref('');
    
    const bodySearch = computed(() => {
        return sortedPosts.value.filter(post => post.body.toLowerCase().includes(searchBody.value.toLowerCase()))
    })
    
    return {
        searchBody,
        bodySearch,
    }
}