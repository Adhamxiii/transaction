import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;

export const GET_TRANSACTION_STATISTICS = gql`
  query GetTransactionStatistics {
    categoryStatistics {
      category
      totalAmount
    }
  }
`;

export const GET_TRANSACTION_AND_USER = gql`
  query GetTransactionAndUser($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      _id
      description
      paymentType
      category
      amount
      location
      date
      user {
        _id
        username
        name
        profilePicture
      }
    }
  }
`;
