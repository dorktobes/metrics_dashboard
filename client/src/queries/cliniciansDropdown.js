import gql from 'graphql-tag';

export default gql`
  {
    Clinicians{
      id
      last_name
      first_name
    }
  }
`;
