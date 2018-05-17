const graphql = require('graphql');

const {
  GraphQLObjectType,
} = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    Clinicians: {},
    Patients: {},
    Appointments: {},
  },
});

module.exports = RootQueryType;
