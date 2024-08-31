import React from 'react';
import { Link } from 'react-router-dom';

export interface BlogPost {
  id: number;
  content: string;
  createdAt: string;
}

interface Props {
  post: BlogPost;
}

const BlogPostCard: React.FC<Props> = ({ post }) => {
  return (
    <Link to={`/post/${post.id}`} className="block">
      <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
        <p className="text-gray-600 mb-2">{new Date(post.createdAt).toLocaleString()}</p>
        <div 
          className="text-lg line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </Link>
  );
};

export default BlogPostCard;