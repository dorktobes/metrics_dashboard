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
      target_patients_per_day
      days_working
      appointments{
        date_of_service
        no_show
        canceled
      }
    }
  }
`;
