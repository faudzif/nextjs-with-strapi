// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://sc-test.ol-staging.com/graphql", // Replace with your GraphQL endpoint
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
    },
    // This should ensure that requests are sent as POST
    fetchOptions: {
      method: "POST",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
