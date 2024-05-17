import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
mutation RegisterUser($email: String!, $password: String!, $firstName: String!, $lastName: String!, $bio: String, $expertise: String, $occupation: String, $role: String!) {
    registerUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      expertise: $expertise
      occupation: $occupation
      role: $role
    ) {
        user {
            id
            email
            firstName
            lastName
            role
            bio
            expertise
            occupation
        }
        token
        refreshToken
        __typename
      }
    }
`;

export const REQUEST_TO_BE_MENTOR = gql`
  mutation RequestToBeMentor{
    requestToBeMentor{
      user {
        id
        role
        email
      }
    }
  }
`;


export const GET_ALL_MENTORS = gql`
  query GetAllMentors {
    allMentors {
      id
      firstName
      lastName
      expertise
    }
  }
`;


export const LOGIN_USER_MUTATION = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

export const REQUEST_SESSION = gql`
  mutation RequestSession($mentorId: Int!) {
    requestSession(mentorId: $mentorId) {
      sessionRequest {
        id
        mentor {
          id
          firstName
          lastName
        }
      }
    }
  }
`;


export const GET_REQUESTS = gql`
  query GetRequests {
    requests {
      id
      mentor {
        id
        firstName
        lastName
      }
      mentee {
        id
        firstName
        lastName
      }
      status
    }
  }
`;

export const ACCEPT_REQUEST = gql`
  mutation AcceptRequest($requestId: ID!) {
    acceptRequest(requestId: $requestId) {
      session {
        id
        mentor {
          id
          firstName
          lastName
        }
        mentee {
          id
          firstName
          lastName
        }
        status
      }
    }
  }
`;

export const REJECT_REQUEST = gql`
  mutation RejectRequest($requestId: ID!) {
    rejectRequest(requestId: $requestId) {
      session {
        id
        mentor {
          id
          firstName
          lastName
        }
        mentee {
          id
          firstName
          lastName
        }
        status
      }
    }
  }
`;  