const API_BASE_URL = 'http://localhost:3001/api';

export const getCurrentQuestion = async () => {
  const response = await fetch(`${API_BASE_URL}/question`);
  if (!response.ok) throw new Error('Failed to fetch question');
  return response.json();
};

export const getAllPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
};

export const getPostById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
};

export const createPost = async (content: string) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};