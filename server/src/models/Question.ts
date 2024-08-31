import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';

class Question extends Model {
  public id!: number;
  public content!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
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
    modelName: 'question',
  }
);

export default Question;