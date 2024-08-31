import React, { useState, useCallback } from 'react';
import QuestionOfTheDay from '../components/QuestionOfTheDay';
import BlogPostList from '../components/BlogPostList';
import BlogPostForm from '../components/BlogPostForm';
import Modal from '../components/Modal';
import { BlogPost } from '../components/BlogPostCard';

const HomePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);

  const handlePostCreated = useCallback((newPost: BlogPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, []);

  return (
    <div className="space-y-8 relative pb-16">
      <QuestionOfTheDay />
      <BlogPostList posts={posts} setPosts={setPosts} />
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-300"
        >
          I want to answer the question!
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <BlogPostForm onPostCreated={handlePostCreated} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HomePage;