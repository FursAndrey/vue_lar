import axios from 'axios';
import {onMounted, ref} from 'vue';

export default function usePosts() {
    const posts = ref([]);
    const totalPages = ref(0);
    const currentPage = ref(1);

    const fetching = async () => {
        let result = await axios.get('/api/post', { params: {'page': currentPage.value} });
        totalPages.value = Math.ceil(result.data.total / result.data.per_page);
        posts.value = result.data.data;
    }
    onMounted(fetching);

    return {
        posts,
        totalPages,
        currentPage,
    }
}