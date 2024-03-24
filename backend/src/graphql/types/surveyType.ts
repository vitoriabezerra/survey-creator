export const surveyType = `#graphql

    type SurveyQuestion {
        id: String!
        title: String!
        isMandatory: Boolean!
        options: [String]!
    }

    # Tipo para Survey
    type Survey {
        id: ID!
        title: String!
        isActivated: Boolean!
        description: String!
        questions: [SurveyQuestion]!
        createdAt: String!
        createdBy: String!
    }

    # Tipo de entrada para perguntas da pesquisa, usado em SurveyInput
    input SurveyQuestionInput {
        id: String!
        title: String!
        isMandatory: Boolean!
        options: [String]!
    }

    # Tipo de entrada para criar/atualizar surveys
    input SurveyInput {
        title: String!
        isActivated: Boolean!
        description: String!
        questions: [SurveyQuestionInput]!
        createdAt: String!
        createdBy: String!
    }

    # Resposta genérica para mensagens
    type MessageResponse {
        message: String!
    }

    type Query {
        surveys(isActivated: Boolean, createdBy: ID): [Survey!]! # Busca surveys com opção para filtrar por ativação e criador
    }

    type Mutation {
        createSurvey(input: SurveyInput!): Survey! # Cria uma nova survey
        updateSurvey(id: ID!, input: SurveyInput!): Survey! # Atualiza uma survey existente
    }
`;
