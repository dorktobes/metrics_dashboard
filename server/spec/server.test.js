import axios from 'axios';

describe('patients endpoint and graphql query should return the same items(get all)', () => {
  test('all patients', async () => {
    const GraphQLesponse = await axios.post('http://localhost:4001/graphql', {
      query: `
      {
        Patients{
          id
          first_name
          last_name
        }
      }
      `,
    });
    const RESTresponse = await axios.get('http://localhost:4001/patients');
    expect(RESTresponse.status).toBe(200);
    expect(GraphQLesponse.status).toBe(200);
    expect(GraphQLesponse.data.data.Patients.length).toEqual(RESTresponse.data.length);
  });
});

describe('patients endpoint and graphql query should return the same item(by id)', () => {
  test('all patients', async () => {
    const GraphQLesponse = await axios.post('http://localhost:4001/graphql', {
      query: `
      {
        Patient(id:1){
          id
          first_name
          last_name
        }
      }
      `,
    });
    const RESTresponse = await axios.get('http://localhost:4001/patients/1');
    expect(RESTresponse.status).toBe(200);
    expect(GraphQLesponse.status).toBe(200);
    expect(GraphQLesponse.data.data.Patient.first_name).toEqual(RESTresponse.data.first_name);
    expect(GraphQLesponse.data.data.Patient.last_name).toEqual(RESTresponse.data.last_name);
  });
});
