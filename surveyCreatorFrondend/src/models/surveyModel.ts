export interface ISurvey {
    title: string;
    status: "activated" | "deativated";
    description: string;
    questions: ISurveyQuestion[];
}

export interface ISurveyQuestion {
    title: string;
    options: string[];
    answer: string;
}

export interface ISurveyCreation {
    surveyId: string;
    createdAt: string;
    createdBy: string;
    survey: ISurvey;
}
