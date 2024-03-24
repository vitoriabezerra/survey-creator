export const surveyAnswserType = `#graphql


    type QuestionAnswer {
        questionId: String!
        answer: String!
    }

    type SurveyAnswer {
        surveyId: String!
        userId: String!
        answers: [QuestionAnswer!]!
    }

    type Query {
        surveyAnswers(surveyId: String!, userId: String): [SurveyAnswer!]!
    }

    input QuestionAnswerInput {
        questionId: String!
        answer: String!
    }

    input SurveyAnswerInput {
        surveyId: String!
        userId: String!
        answers: [QuestionAnswerInput!]!
    }

    type MessageResponse {
        message: String!
    }

    type Mutation {
        answerSurvey(input: SurveyAnswerInput!): MessageResponse!
    }
`;
