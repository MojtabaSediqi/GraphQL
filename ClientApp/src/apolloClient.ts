import { ApolloClient, InMemoryCache, split, HttpLink } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({ uri: 'https://localhost:7230/graphql' });

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:7230/graphql',
  })
);

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink
);

export const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});