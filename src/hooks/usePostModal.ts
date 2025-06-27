import { useState } from 'react';
import type { Post, PostUpdate } from '../types/post';

export function usePostModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedPost,
    openModal,
    closeModal
  };
}