import { gql } from "@apollo/client";

export const GET_SURVEYS_QUERY = gql`
    query GetSurveys($isActivated: Boolean, $createdBy: ID) {
        surveys(isActivated: $isActivated, createdBy: $createdBy) {
            id
            title
            description
            isActivated
            questions {
                id
                title
                isMandatory
                options
            }
            createdAt
            createdBy
        }
    }
`;

export const GET_SURVEY_ANSWERS = gql`
    query GetSurveyAnswers($surveyId: String!) {
        surveyAnswers(surveyId: $surveyId) {
            userId
            answers {
                questionId
                answer
            }
        }
    }
`;

export const GET_USER_QUERY = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            name
            email
            typeOfUser
            createdAt
            updatedAt
            surveys {
                created
                answered
            }
        }
    }
`;
