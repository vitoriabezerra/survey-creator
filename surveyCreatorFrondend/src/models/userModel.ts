export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    typeOfUser: UserType;
    surveys: IUserSurveys;
}

export enum UserType {
    user = "user",
    admin = "admin",
}

export interface IUserSurveys {
    answered: string[];
    created: string[];
}