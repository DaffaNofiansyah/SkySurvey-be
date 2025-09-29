import { DataTypes } from "sequelize";

const Response = (sequelize) => {
  return sequelize.define("Response", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.STRING, defaultValue: "completed" }, // completed, partial
    survey_id: { type: DataTypes.UUID, allowNull: false, field: 'survey_id' },
  }, {
    tableName: 'responses',
    timestamps: false,
  });
};

export default Response;
