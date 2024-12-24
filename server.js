import { ApolloServer } from "apollo-server"; // ApolloServer-ийг импортлох
import mongoose from "mongoose"; // mongoose-ийг импортлох
import typeDefs from "./graphql/typeDefs"; // typeDefs-ийг импортлох
import resolvers from "./graphql/resolvers"; // resolvers-ийг импортлох

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen().then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
