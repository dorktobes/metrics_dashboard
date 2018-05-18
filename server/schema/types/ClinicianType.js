const graphql = require('graphql');

const PatientType = require('./PatientType');
const AppointmentType = require('./AppointmentType');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} = graphql;

const ClinicianType = new GraphQLObjectType({
  name: 'ClinicianType',
  fields: () => (
    {
      id: {
        type: GraphQLID,
      },
      first_name: {
        type: GraphQLString,
      },
      last_name: {
        type: GraphQLString,
      },
      clinic: {
        type: GraphQLFloat,
      },
      target_patients_per_day: {
        type: GraphQLFloat,
      },
      days_working: {
        type: GraphQLFloat,
      },
      specialty_1: {
        type: GraphQLString,
      },
      specialty_2: {
        type: GraphQLString,
      },
      specialty_3: {
        type: GraphQLString,
      },
      appointments: {
        type: new GraphQLList(AppointmentType),
        resolve({ id }, args, context) {
          return context.models.appointments.cliniciansLoader.load(id);
        },
      },
    }
  ),
});

module.exports = ClinicianType;
