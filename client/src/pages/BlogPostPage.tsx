import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../services/api';

interface BlogPost {
  id: number;
  content: string;
  createdAt: string;
}

const BlogPostPage: React.FC = () => {
  const { id='' } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPostById(parseInt(id));
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <div className="text-center">Loading...</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
      <p className="text-gray-600 mb-4">{new Date(post.createdAt).toLocaleString()}</p>
      <div 
        className="text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogPostPage;