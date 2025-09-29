import { DataTypes } from "sequelize";

const Question = (sequelize) => {
  return sequelize.define("Question", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    question_text: { type: DataTypes.TEXT, allowNull: false },
    question_order: { type: DataTypes.INTEGER, allowNull: false },
    survey_id: { type: DataTypes.UUID, allowNull: false, field: 'survey_id' },
  }, {
    tableName: 'questions',
    timestamps: false,
  });
};

export default Question;
