// Definição das interfaces
export interface ISurveyQuestion {
    title: string;
    isMandatory: boolean;
    options: string[];
}

export interface ISurvey {
    title: string;
    isActivated: boolean;
    description: string;
    questions: ISurveyQuestion[];
}
export interface ISurveyCreation {
    surveyId: string;
    createdAt: string;
    createdBy: string;
    survey: ISurvey;
}
