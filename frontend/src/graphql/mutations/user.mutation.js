import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation LoginUser($input: LoginInput!) {
    logIn(input: $input) {
      _id
      name
      username
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      username
      name
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;
