const mongoose = require("mongoose");

const { Schema } = mongoose;

export interface ISurveyAnswer {
    surveyId: string;
    userId: string;
    answers: QuestionAnswer[];
}

interface QuestionAnswer {
    questionId: string;
    answer: string;
}

// Esquema para as respostas das perguntas
const QuestionAnswerSchema = new Schema({
    questionId: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

// Esquema para as respostas da pesquisa
const SurveyAnswerSchema = new Schema({
    surveyId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    answers: [QuestionAnswerSchema], // Array de respostas das perguntas
});

// Criando o modelo
const SurveyAnswer = mongoose.model("Survey-Answer", SurveyAnswerSchema);

export default SurveyAnswer;
