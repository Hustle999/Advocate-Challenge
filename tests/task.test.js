import request from "supertest";
import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import dotenv from "dotenv";
import typeDefs from "../graphql/typeDefs";
import resolvers from "../graphql/resolvers";

dotenv.config();

const createTestServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({
      db: mongoose.connection,
    }),
  });

  // Портыг 4001 болгосон
  await server.listen({ port: 4002 }); // Тэнд server.listen зөв ажиллаж байна
  return request("http://localhost:4002"); // Серверээс урьдчилан тодорхой url
};

describe("GraphQL API", () => {
  beforeAll(async () => {
    // MongoDB холболт
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Бүх өгөгдлийг устгах
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it("should fetch all tasks", async () => {
    const GET_ALL_TASKS = gql`
      query {
        getAllTasks {
          id
          title
          description
          status
        }
      }
    `;

    const res = await createTestServer().post("/graphql").send({
      query: GET_ALL_TASKS,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.getAllTasks).toEqual([]);
  });

  it("should create a new task", async () => {
    const ADD_TASK = gql`
      mutation {
        addTask(title: "Test Task", description: "Test description") {
          id
          title
          description
          status
        }
      }
    `;

    const res = await createTestServer().post("/graphql").send({
      query: ADD_TASK,
    });

    expect(res.status).toBe(200);
    expect(res.body.data.addTask).toHaveProperty("id");
    expect(res.body.data.addTask.title).toBe("Test Task");
    expect(res.body.data.addTask.status).toBe("active");
  });
});
