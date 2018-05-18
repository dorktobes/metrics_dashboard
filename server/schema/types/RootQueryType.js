const graphql = require('graphql');

const ClinicianType = require('./ClinicianType');
const PatientType = require('./PatientType');
const AppointmentType = require('./AppointmentType');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Clinician: {
      type: ClinicianType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }, context) {
        return context.models.clinicians.getById(id);
      },
    },
    Clinicians: {
      type: new GraphQLList(ClinicianType),
      resolve(parentValue, args, context) {
        return context.models.clinicians.getAll();
      },
    },
    Patient: {
      type: PatientType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }, context) {
        return context.models.patients.getById(id);
      },
    },
    Patients: {
      type: new GraphQLList(PatientType),
      resolve(parentValue, args, context) {
        return context.models.patients.getAll();
      },
    },
    Appointments: {
      type: new GraphQLList(AppointmentType),
      resolve(parentValue, args, context) {
        return context.models.appointments.getAll();
      },
    },
  },
});

module.exports = RootQueryType;
