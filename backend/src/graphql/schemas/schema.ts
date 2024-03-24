import { makeExecutableSchema } from "@graphql-tools/schema";
import { userType } from "../types/userType";
import { userResolver } from "../resolvers/userResolver";
import { surveyType } from "../types/surveyType";
import { surveyResolver } from "../resolvers/surveyResolver";
import { surveyAnswserType } from "../types/surveyAnwerType";
import { surveyAnswerResolver } from "../resolvers/surveyAnwserResolver";

export const schema = makeExecutableSchema({
    typeDefs: [userType, surveyType, surveyAnswserType],
    resolvers: [userResolver, surveyResolver, surveyAnswerResolver],
});
