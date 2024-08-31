import React, { useEffect } from 'react';
import { getAllPosts } from '../services/api';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  id: number;
  content: string;
  createdAt: string;
}

interface Props {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

const BlogPostList: React.FC<Props> = ({ posts, setPosts }) => {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [setPosts]);

  return (
    <div className="space-y-6">
      {/* <h2 className="text-2xl font-bold text-center text-purple-600">Today's Thoughts</h2> */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPostList;