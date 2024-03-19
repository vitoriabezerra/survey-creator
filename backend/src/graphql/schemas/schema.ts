import { gql } from "apollo-server-express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { userType } from "../types/userType"
import { userResolver } from "../resolvers/userResolver";

export const schema = makeExecutableSchema({
    typeDefs: [userType],
    resolvers: [userResolver],
});
