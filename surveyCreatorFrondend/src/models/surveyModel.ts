// Definição das interfaces
export interface ISurveyQuestion {
    title: string;
    isMandatory: boolean;
    options: string[];
    currentAnswer: string | null;
}

export interface ISurvey {
    title: string;
    status: "activated" | "deactivated";
    description: string;
    questions: ISurveyQuestion[];
}
export interface ISurveyCreation {
    surveyId: string;
    createdAt: string;
    createdBy: string;
    survey: ISurvey;
}
