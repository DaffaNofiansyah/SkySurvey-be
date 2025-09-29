import { DataTypes } from "sequelize";

const ActivityModel = (sequelize) => {
  const Activity = sequelize.define("activity", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    activity_type: { type: DataTypes.STRING, allowNull: false }, // e.g., 'survey_created', 'response_submitted'
    activity_timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    details: { type: DataTypes.TEXT },
    survey_id: { type: DataTypes.UUID, allowNull: true, field: 'survey_id' },
  }, {
    tableName: 'activities',
    timestamps: false,
  });
  return Activity;
};

export default ActivityModel;
