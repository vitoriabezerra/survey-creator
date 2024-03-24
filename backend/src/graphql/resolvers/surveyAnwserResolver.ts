import SurveyAnswer, { ISurveyAnswer } from "../../models/surveyAnswers";
import User from "../../models/user";

interface QueryInput {
    surveyId?: string;
    userId?: string;
}

interface MutationInput {
    input: ISurveyAnswer;
}

export const surveyAnswerResolver = {
    Query: {
        surveyAnswers: async (_: unknown, { surveyId, userId }: QueryInput) => {
            try {
                // Constrói o objeto de filtro baseado nos parâmetros fornecidos
                const filter = { surveyId, userId };
                if (userId) filter.userId = userId;

                const answers = await SurveyAnswer.find(filter);
                return answers;
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch survey answers.");
            }
        },
    },
    Mutation: {
        answerSurvey: async (_: unknown, { input }: MutationInput) => {
            try {
                const newAnswer = new SurveyAnswer(input);
                await newAnswer.save();

                // Atualiza o usuário para incluir a pesquisa nas respondidas
                await User.updateOne(
                    { id: input.userId },
                    { $addToSet: { "surveys.answered": input.surveyId } }
                );
                return { message: "Respostas salvas com sucesso!" };
            } catch (error) {
                console.error(error);
                throw new Error("Failed to save survey answer.");
            }
        },
    },
};
