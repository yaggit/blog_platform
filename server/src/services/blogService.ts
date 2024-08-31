import BlogPost from '../models/BlogPost';

export class BlogService {
  static async getAllPosts() {
    return BlogPost.findAll({ order: [['createdAt', 'DESC']] });
  }

  static async getPostById(id: number) {
    const post = await BlogPost.findByPk(id);
    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  static async createPost(content: string) {
    return BlogPost.create({ content });
  }

  static async clearAllPosts() {
    return BlogPost.destroy({ where: {} });
  }
}