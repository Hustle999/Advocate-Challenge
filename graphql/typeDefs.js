import { gql } from "apollo-server";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
  }

  type Query {
    getAllTasks: [Task!]!
  }

  type Mutation {
    addTask(title: String!, description: String!): Task!
  }
`;

export default typeDefs; // typeDefs-г экспортлох
