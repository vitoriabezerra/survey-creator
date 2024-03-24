export interface ISurveyAnswer {
    surveyId: string;
    userId: string;
    answers: QuestionAnswer[];
}

interface QuestionAnswer {
    questionId: string;
    answer: string;
}
