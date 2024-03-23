export interface ISurveyAnswer {
    surveyId: string;
    userId: string;
    answers: Array<{
        questionId: string;
        answer: string;
    }>;
}

interface QuestionAnswer {
    questionId: string;
    answer: string;
}
