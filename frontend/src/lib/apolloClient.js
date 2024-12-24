// src/lib/apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Таны GraphQL серверийн хаяг
  cache: new InMemoryCache(),
});

export default client;
