import { gql } from 'graphql-request/dist';

export const getDefaultUsers = gql`
  query getDefaultUsers {
    user {
      Name
      comment
      contact
      created_at
      email
      id
    }
  }
`;
