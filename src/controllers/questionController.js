import { Question, Survey, Activity } from "../models/index.js";

// Create a question
export const createQuestion = async (req, res) => {
  try {
    const { surveyId, question_text, question_order } = req.body;

    const question = await Question.create({
      SurveyId: surveyId,
      question_text,
      question_order,
    });

    await Activity.create({
      SurveyId: surveyId,
      activity_type: "question_created",
      details: `Question "${question_text}" added to survey ${surveyId}`,
    });

    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get all questions
export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const { question_text, question_order } = req.body;
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.update({ question_text, question_order });

    await Activity.create({
      SurveyId: question.SurveyId,
      activity_type: "question_updated",
      details: `Question "${question_text}" updated`,
    });

    res.json(question);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    await question.destroy();

    await Activity.create({
      SurveyId: question.SurveyId,
      activity_type: "question_deleted",
      details: `Question "${question.question_text}" deleted`,
    });

    res.json({ message: "Question deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
