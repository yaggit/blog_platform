import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createPost } from '../services/api';
import { BlogPost } from './BlogPostCard';

interface Props {
  onPostCreated: (newPost: BlogPost) => void;
  onClose: () => void;
}

const validationSchema = Yup.object({
  content: Yup.string()
    .matches(/^[a-zA-Z0-9\s.,!]*$/, 'Only letters, numbers, spaces, periods, commas, and exclamation marks are allowed.')
    .required('Content is required'),
});

const BlogPostForm: React.FC<Props> = ({ onPostCreated, onClose }) => {

  const handleSubmit = async (values: { content: string }, { setSubmitting, setErrors }: any) => {
    try {
      const newPost = await createPost(values.content);
      onPostCreated(newPost);
      setSubmitting(false);
      onClose();
    } catch (error) {
      console.error('Error creating post:', error);
      setErrors({ content: 'An error occurred while creating the post' });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ content: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Share Your Thoughts</h2>
          <p>p.s. it will be deleted within 24 hours</p>
          <div>
            <Field
              as="textarea"
              name="content"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
              placeholder="Tell me ..."
            />
            <ErrorMessage name="content" component="p" className="text-red-500 text-sm" />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-700 hover:to-pink-700 transition-colors duration-300"
            >
              Post
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default BlogPostForm;
