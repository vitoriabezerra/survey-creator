import { makeExecutableSchema } from "@graphql-tools/schema";
import { userType } from "../types/userType";
import { userResolver } from "../resolvers/userResolver";
import { surveyType } from "../types/surveyType";
import { surveyResolver } from "../resolvers/surveyResolver";

export const schema = makeExecutableSchema({
    typeDefs: [userType, surveyType],
    resolvers: [userResolver, surveyResolver],
});
