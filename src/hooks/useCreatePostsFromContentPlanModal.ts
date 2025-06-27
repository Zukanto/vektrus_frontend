import { useState } from 'react';

export function useCreatePostsFromContentPlanModal() {
    const [isOpenPosts, setIsOpenPosts] = useState(false);

    const openModalPosts = () => setIsOpenPosts(true);
    const closeModalPosts = () => setIsOpenPosts(false);

    return {
        isOpenPosts,
        openModalPosts,
        closeModalPosts
    };
}