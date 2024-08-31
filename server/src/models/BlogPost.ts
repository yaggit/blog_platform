import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class BlogPost extends Model {
  public id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'blogPost',
  }
);

export default BlogPost;