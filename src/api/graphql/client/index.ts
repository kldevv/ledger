import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { withScalars } from "apollo-link-scalars";
import { buildClientSchema } from "graphql";
import { DateTimeResolver } from "graphql-scalars";

import introspection from '@/api/graphql/__generated__/introspection.json'

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    withScalars({
      schema: buildClientSchema(introspection as unknown as IntrospectionQuery),
      typesMap: {
        DateTime: DateTimeResolver,
      },
    }),
    new HttpLink({ uri: 'http://localhost:3000/api/graphql' }),
  ]),
});

export default apolloClient;