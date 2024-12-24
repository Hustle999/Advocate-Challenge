import Task from "../models/Task"; // Task моделийг импортлох

const resolvers = {
  Query: {
    getAllTasks: async () => {
      return await Task.find(); // MongoDB-н бүх task-ийг олох
    },
  },
  Mutation: {
    addTask: async (_, { title, description }) => {
      const newTask = new Task({ title, description, status: "active" });
      return await newTask.save(); // Шинэ task үүсгэх
    },
  },
};

export default resolvers; // resolvers-г экспортлох
