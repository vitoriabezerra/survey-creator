import mongoose, { Schema } from "mongoose";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    typeOfUser: "admin" | "user";
    surveys: IUserSurveys;
}

export interface IUserSurveys {
    answered: string[];
    created: string[];
}

const UserSurveysSchema = new Schema<IUserSurveys>(
    {
        answered: [{ type: String }],
        created: [{ type: String }],
    },
    { _id: false }
); // _id: false pois é um subdocumento.

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    typeOfUser: { type: String, enum: ["admin", "user"], required: true },
    surveys: { type: UserSurveysSchema, required: true },
  });



const User = mongoose.model("Users", UserSchema);

export default User;