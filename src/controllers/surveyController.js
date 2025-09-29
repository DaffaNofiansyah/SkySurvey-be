import { Survey, Question, Activity } from "../models/index.js";

// Create a survey
export const createSurvey = async (req, res) => {
  try {
    const { title, description, max_respondents, questions } = req.body;

    const survey = await Survey.create(
      {
        title,
        description,
        max_respondents,
        Questions: questions.map((q, index) => ({ question_text: q, question_order: index + 1 })),
        survey_link: `survey-${Date.now()}`,
        status: "draft",
      },
      { include: [Question] }
    );

    await Activity.create({
      SurveyId: survey.id,
      activity_type: "survey_created",
      details: `Survey "${title}" created`,
    });

    res.json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get all surveys
export const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll({ include: [Question] });
    res.json(surveys);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get a survey by ID
export const getSurveyById = async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id, { include: [Question] });
    if (!survey) return res.status(404).json({ message: "Survey not found" });
    res.json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Update survey
export const updateSurvey = async (req, res) => {
  try {
    console.log("Update Survey Request Body:", req.body);
    const { title, description, max_respondents, questions } = req.body;
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });

    await survey.update({ title, description, max_respondents });

    await Question.destroy({ where: { survey_id: survey.id } });
    const newQuestions = questions.map((q, index) => ({ question_text: q, question_order: index + 1, survey_id: survey.id }));
    await Question.bulkCreate(newQuestions);

    await Activity.create({
      SurveyId: survey.id,
      activity_type: "survey_updated",
      details: `Survey "${title}" updated`,
    });
    
    const updatedSurvey = await Survey.findByPk(req.params.id, { include: [Question] });
    res.json(updatedSurvey);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//  Activate survey
export const activateSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });
    await survey.update({ status: "active" });
    await Activity.create({
      SurveyId: survey.id,
      activity_type: "survey_activated",
      details: `Survey "${survey.title}" activated`,
    });
    res.json(survey);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete survey
export const deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByPk(req.params.id);
    if (!survey) return res.status(404).json({ message: "Survey not found" });

    await survey.destroy();

    await Activity.create({
      SurveyId: survey.id,
      activity_type: "survey_deleted",
      details: `Survey "${survey.title}" deleted`,
    });

    res.json({ message: "Survey deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
