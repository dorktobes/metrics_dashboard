import gql from 'graphql-tag';

export default gql`
  mutation UpdateSelectedClinician($id: ID!) {
    updateSelectedClinician(id: $id) @client{
      id
    }
  }
`;
