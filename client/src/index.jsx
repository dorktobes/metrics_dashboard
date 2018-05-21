import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from './App';

const link = createHttpLink({
  uri: '/graphql',
  fetchOptions: {
    credentials: 'same-origin',
  },
});

const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , document.querySelector('#app'),
);
