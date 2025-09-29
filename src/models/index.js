import sequelize from "../config/db.js";
import SurveyModel from "./surveyModel.js";
import QuestionModel from "./questionModel.js";
import ResponseModel from "./responseModel.js";
import AnswerModel from "./answerModel.js";
import ActivityModel from "./activityModel.js";

// Initialize models
const Survey = SurveyModel(sequelize);
const Question = QuestionModel(sequelize);
const Response = ResponseModel(sequelize);
const Answer = AnswerModel(sequelize);
const Activity = ActivityModel(sequelize);

// Define associations
Survey.hasMany(Question, { foreignKey: 'survey_id', onDelete: "CASCADE" });
Question.belongsTo(Survey, { foreignKey: 'survey_id' });

Survey.hasMany(Response, { foreignKey: 'survey_id', onDelete: "CASCADE" });
Response.belongsTo(Survey, { foreignKey: 'survey_id' });

Response.hasMany(Answer, { foreignKey: 'response_id', onDelete: "CASCADE" });
Answer.belongsTo(Response, { foreignKey: 'response_id' });

Question.hasMany(Answer, { foreignKey: 'question_id', onDelete: "CASCADE" });
Answer.belongsTo(Question, { foreignKey: 'question_id' });

Survey.hasMany(Activity, { foreignKey: 'survey_id', onDelete: "CASCADE" });
Activity.belongsTo(Survey, { foreignKey: 'survey_id' });
  
export { sequelize, Survey, Question, Response, Answer, Activity };
