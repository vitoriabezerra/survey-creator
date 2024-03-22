export interface IUser {
    id: string;
    name: string;
    email: string;
    typeOfUser: "admin" | "user";
    surveys: IUserSurveys;
}

export interface IUserSurveys {
    answered: string[];
    created: string[];
}