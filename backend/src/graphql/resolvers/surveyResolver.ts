import Survey, { ISurvey } from "../../models/survey";
import User from "../../models/user";

interface QuerySurveyArgs {
    isActivated?: boolean;
    createdBy?: string;
}

interface CreateSurveyArgs {
    input: ISurvey;
}

interface UpdateSurveyArgs extends CreateSurveyArgs {
    id: string;
}

export const surveyResolver = {
    Query: {
        surveys: async (
            _: unknown,
            { isActivated, createdBy }: QuerySurveyArgs
        ): Promise<ISurvey[]> => {
            // Assumindo que ISurvey é a interface do seu modelo Survey
            let filters: any = {};
            if (isActivated !== undefined) {
                filters.isActivated = isActivated;
            }
            if (createdBy) {
                filters.createdBy = createdBy;
            }
            // Assumindo que Survey.find retorna uma Promise<ISurvey[]>
            return await Survey.find(filters);
        },
    },
    Mutation: {
        // Criar uma nova survey
        createSurvey: async (_: unknown, { input }: CreateSurveyArgs) => {
            const newSurvey = new Survey({
                ...input,
                createdAt: new Date().toISOString(),
            });

            // Atualiza o usuário para incluir a pesquisa nas criadas
            await User.updateOne(
                { id: input.createdBy },
                { $addToSet: { "surveys.created": input.id } }
            );
            return await newSurvey.save();
        },
        // Atualizar uma survey existente
        updateSurvey: async (_: unknown, { id, input }: UpdateSurveyArgs) => {
            return await Survey.findByIdAndUpdate(
                id,
                { ...input },
                { new: true }
            );
        },
    },
};
