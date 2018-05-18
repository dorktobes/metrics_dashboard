const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = graphql;

const AppointmentType = new GraphQLObjectType({
  name: 'AppointmentType',
  fields: () => ({
    clinic: {
      type: GraphQLFloat,
    },
    patient: {
      type: require('./PatientType'),
      resolve({ patient_id }, args, context) {
        return context.models.patients.getById(patient_id);
      },
    },
    clinician: {
      type: require('./ClinicianType'),
      resolve({ clinician_id }, args, context) {
        return context.models.clinicians.getById(clinician_id);
      },
    },
    date_scheduled: {
      type: GraphQLString,
    },
    date_of_service: {
      type: GraphQLString,
    },
    canceled: {
      type: GraphQLBoolean,
    },
    no_show: {
      type:GraphQLBoolean,
    },
  }),
});

module.exports = AppointmentType;
