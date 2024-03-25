import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            name
            email
            typeOfUser
            surveys {
                answered
                created
            }
        }
    }
`;

export const CREATE_SURVEY_MUTATION = gql`
    mutation CreateSurvey($input: SurveyInput!) {
        createSurvey(input: $input) {
            title
            description
            isActivated
            questions {
                title
                isMandatory
                options
            }
            createdBy
        }
    }
`;

export const UPDATE_SURVEY_MUTATION = gql`
    mutation updateSurvey($id: ID!, $input: SurveyInput!) {
        updateSurvey(id: $id, input: $input) {
            id
            title
            description
            isActivated
            questions {
                title
                isMandatory
                options
            }
            createdAt
            createdBy
        }
    }
`;

export const ANSWER_SURVEY_MUTATION = gql`
    mutation AnswerSurvey($input: SurveyAnswerInput!) {
        answerSurvey(input: $input) {
            message
        }
    }
`;
