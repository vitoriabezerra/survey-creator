const mongoose = require("mongoose");

export interface ISurveyQuestion {
    id: string;
    title: string;
    isMandatory: boolean;
    options: string[];
}

export interface ISurvey {
    id: string;
    title: string;
    isActivated: boolean;
    description: string;
    questions: ISurveyQuestion[];
    createdAt: string;
    createdBy: string;
}

const SurveyQuestionSchema = new mongoose.Schema({
    title: String,
    isMandatory: Boolean,
    options: [String],
});

const SurveySchema = new mongoose.Schema({
    title: String,
    isActivated: Boolean,
    description: String,
    questions: [SurveyQuestionSchema],
    createdAt: String,
    createdBy: String,
});

const Survey = mongoose.model("Surveys", SurveySchema);

export default Survey;
