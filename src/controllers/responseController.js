import { Response, Answer, Survey, Activity } from "../models/index.js";

// Create a response
export const createResponse = async (req, res) => {
  try {
    const { survey_id, answers } = req.body;

    const response = await Response.create({ survey_id });

    // Create answers
    for (const ans of answers) {
      await Answer.create({ response_id: response.id, question_id: ans.question_id, answer_text: ans.answer_text });
    }

    const survey = await Survey.findByPk(survey_id);
    await Activity.create({
      survey_id: survey_id,
      activity_type: "response_created",
      details: `Response submitted for survey ${survey.title}`
    });

    survey.respondent_count += 1;
    if (survey.respondent_count >= survey.max_respondents) {
      survey.status = "completed";
    }
    await survey.save();

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get all responses
export const getResponses = async (req, res) => {
  try {
    const responses = await Response.findAll({ include: [Answer, Survey] });
    res.json(responses);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
