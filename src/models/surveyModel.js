import { DataTypes } from "sequelize";

const Survey = (sequelize) => {
  return sequelize.define("Survey", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    max_respondents: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING, defaultValue: "active" }, // active, closed
    respondent_count: { type: DataTypes.INTEGER, defaultValue: 0 },
    survey_link: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    tableName: 'surveys',
    timestamps: false,
  });
};

export default Survey;
