import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BlogPost {
  id: number;
  content: string;
  createdAt: string;
}

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const addPost = (post: BlogPost) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  return (
    <BlogContext.Provider value={{ posts, addPost }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};