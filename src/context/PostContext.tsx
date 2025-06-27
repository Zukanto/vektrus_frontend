import React, {createContext, useContext, useEffect, useState} from 'react';
import type { Post, PostUpdate } from '../types/post';

interface PostContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (id: number, updates: PostUpdate) => void;
  deletePost: (id: number) => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    console.log('Aktualisierte Posts:', posts);
  }, [posts]);

  const addPost = (post: Omit<Post, 'id'>) => {
    setPosts(currentPosts => [
      ...currentPosts,
      {
        ...post,
        id: Math.max(0, ...currentPosts.map(p => p.id)) + 1
      }
    ]);
  };

  const updatePost = (id: number, updates: PostUpdate) => {
    setPosts(currentPosts =>
      currentPosts.map(post =>
        post.id === id ? { ...post, ...updates } : post
      )
    );
  };

  const deletePost = (id: number) => {
    setPosts(currentPosts => currentPosts.filter(post => post.id !== id));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
}

export function usePostContext() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
}