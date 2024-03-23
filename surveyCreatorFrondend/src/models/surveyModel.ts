// Definição das interfaces
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
