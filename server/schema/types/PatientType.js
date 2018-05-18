const graphql = require('graphql');

const AppointmentType = require('./AppointmentType');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} = graphql;

const PatientType = new GraphQLObjectType({
  name: 'PatientType',
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
      address: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      referral_channel: {
        type: GraphQLString,
      },
      diagnosis: {
        type: GraphQLString,
      },
      clinician: {
        type: require('./ClinicianType'),
        resolve({ primary_clinician }, args, context) {
          if (primary_clinician) {
            return context.models.clinicians.getById(primary_clinician);
          }
          return null;
        },
      },
      appointments: {
        type: new GraphQLList(AppointmentType),
        resolve({ id }, args, context) {
          return context.models.appointments.patientsLoader.load(id);
        },
      },
    }
  ),
});

module.exports = PatientType;
