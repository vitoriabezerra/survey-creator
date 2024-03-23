import { gql } from "@apollo/client";

export const GET_SURVEYS_QUERY = gql`
    query GetSurveys($isActivated: Boolean, $createdBy: ID) {
        surveys(isActivated: $isActivated, createdBy: $createdBy) {
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
