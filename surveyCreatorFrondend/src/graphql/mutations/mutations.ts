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
