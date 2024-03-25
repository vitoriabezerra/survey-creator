import User, { IUser, IUserLogin } from "../../models/user";
import { v4 as uuidv4 } from "uuid";
interface CreateUserArgs {
    input: IUser;
}

interface MessageResponse {
    message: string;
}

interface QueryInput {
    id: string;
}

interface AddSurveyInput {
    surveyId: string;
    userId: string;
}

const bcrypt = require("bcrypt");
const saltRounds = 10; //numero de salts para o has

export const userResolver = {
    Query: {
        user: async (_: unknown, { id }: QueryInput) => {
            try {
                const user = await User.findOne({ id: id });
                return user;
            } catch (error) {
                throw new Error("User not found");
            }
        },
        users: async () => {
            return await User.find({});
        },
    },
    Mutation: {
        createUser: async (_: unknown, { input }: CreateUserArgs) => {
            const user = await User.findOne({ email: input.email });
            if (user) {
                throw new Error("E-mail já está em uso.");
            }
            // Hashear a senha antes de salvar o usuário
            const hashedPassword = await bcrypt.hash(
                input.password,
                saltRounds
            );

            // Criar um novo usuário com a senha hasheada
            const newUser = new User({
                ...input,
                id: uuidv4(),
                password: hashedPassword,
            });

            // Salvar o usuário no banco de dados
            await newUser.save();

            // Retornar o novo usuário, omitindo a senha por segurança
            const { password, ...userInfo } = newUser.toObject();
            return userInfo;
        },
        login: async (_: unknown, { email, password }: IUserLogin) => {
            // Procurar o usuário pelo email
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            // Verificar a senha
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error("Senha inválida.");
            }

            // Retornar o usuário sem a senha
            const { password: userPassword, ...userInfo } = user.toObject();
            return userInfo;
        },
        resetPassword: async (
            _: unknown,
            { email, password }: IUserLogin
        ): Promise<MessageResponse> => {
            // Procurar o usuário pelo email
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            // Hashear a nova senha
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Atualizar a senha do usuário no banco de dados
            user.password = hashedPassword;

            // Salvar as alterações no usuário
            await user.save();

            // Pode-se optar por enviar uma resposta específica após o reset de senha
            return { message: "Senha atualizada com sucesso." };
        },
    },
};
