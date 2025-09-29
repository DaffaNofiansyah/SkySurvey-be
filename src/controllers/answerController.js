import { Answer, Response, Question, Activity, Survey } from "../models/index.js";

export const createAnswer = async (req, res) => {
  try {
    const { responseId, questionId, answer_text } = req.body;

    const answer = await Answer.create({
      ResponseId: responseId,
      QuestionId: questionId,
      answer_text,
    });

    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get all answers
export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll({ include: [{model: Question, include: [{model: Survey}]}, {model:Response}] });
    res.json(answers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get answer by ID
export const getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id, { include: [Question, Response] });
    if (!answer) return res.status(404).json({ message: "Answer not found" });
    res.json(answer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete an answer
export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const response = await Response.findByPk(answer.ResponseId);

    await answer.destroy();

    if (response) {
      await Activity.create({
        SurveyId: response.SurveyId,
        activity_type: "answer_deleted",
        details: `Answer ${answer.id} deleted`,
      });
    }

    res.json({ message: "Answer deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
