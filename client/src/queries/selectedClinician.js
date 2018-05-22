import gql from 'graphql-tag';

export default gql`
  query {
    selectedClinician @client {
      id
    }
  }
`;
