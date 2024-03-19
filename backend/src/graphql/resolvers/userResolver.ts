import User, { IUser } from "../../models/user";

interface CreateUserArgs {
    input: IUser;
}

export const userResolver = {
    Query: {
        users: async () => await User.find({}),
    },
    Mutation: {
        createUser: async (_: unknown, { input }: CreateUserArgs) => {
            const newUser = new User(input);
            await newUser.save();
            return newUser;
        },
    },
};
