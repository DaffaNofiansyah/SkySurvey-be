import { DataTypes, TableHints } from "sequelize";

export default (sequelize) => {
  const Answer = sequelize.define("Answer", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    answer_text: { type: DataTypes.TEXT, allowNull: false },
    response_id: { type: DataTypes.UUID, allowNull: false, field: 'response_id' },
    question_id: { type: DataTypes.UUID, allowNull: false, field: 'question_id' },
  }, {
    tableName: 'answers',
    timestamps: false,
  });
  return Answer;
};
