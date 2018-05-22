import gql from 'graphql-tag';

export default gql`
  query GetClinicianMeta($selectedClinician:ID!){
    Clinician(id:$selectedClinician) {
      id
      first_name
      last_name
      specialty_1
      specialty_2
      specialty_3
      appointments{
        date_of_service
        no_show
        canceled
      }
    }
  }
`;
