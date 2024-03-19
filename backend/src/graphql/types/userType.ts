import { gql } from "apollo-server-express"; // Ou 'apollo-server' se você não estiver usando Express.

export const userType = gql`
    # Enum para o tipo de usuário
    enum TypeOfUser {
        admin
        user
    }

    # Type for UserSurveys
    type UserSurveys {
        answered: [String!]!
        created: [String!]!
    }

    # Main type for User
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
        createdAt: String
        updatedAt: String
        typeOfUser: TypeOfUser!
        surveys: UserSurveys!
    }

    # Type of input to update users
    input UserInput {
        name: String!
        email: String!
        password: String!
        typeOfUser: TypeOfUser!
        surveys: UserSurveysInput!
    }

    # Tipo de entrada para UserSurveys, usado em UserInput
    input UserSurveysInput {
        answered: [String!]!
        created: [String!]!
    }

    extend type Query {
        user(id: ID!): User
        users: [User!]!
    }

    extend type Mutation {
        createUser(input: UserInput!): User!
    }
`;
