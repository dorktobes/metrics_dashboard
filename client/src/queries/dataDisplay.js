import gql from 'graphql-tag';

export default gql`
  query GetClinician($selectedClinician:ID!){
    Clinician(id:$selectedClinician) {
      id
      first_name
      last_name
      appointments{
        patient{
          first_name
          last_name
        }
        date_of_service
        no_show
        canceled
      }
    }
  }
`;
