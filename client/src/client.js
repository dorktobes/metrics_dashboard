import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

const cache = new InMemoryCache();

const defaultState = {
  selectedClinician: {
    __typename: 'selectedClinician',
    id: null,
  },
};

const stateLink = withClientState({
  cache,
  defaults: defaultState,
  resolvers: {
    Mutation: {
      updateSelectedClinician(_, { id }, { cache }) {
        const query = gql`
          query {
            selectedClinician @client {
              __typename
              id
            }
          }
        `;
        const prevState = cache.readQuery({ query });
        const data = {
          ...prevState,
          selectedClinician: {
            ...prevState.selectedClinician,
            id,
          },
        };
        cache.writeData({ query, data });
      },
    },
  },
});

const httpLink = createHttpLink({
  uri: '/graphql',
  fetchOptions: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link: ApolloLink.from([stateLink, httpLink]),
  cache,
});

export default client;
