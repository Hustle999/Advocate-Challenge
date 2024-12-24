import mongoose from "mongoose"; // mongoose-ийг импортлох

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "active" }, // Статусыг "active" гэж тохируулна
});

const Task = mongoose.model("Task", taskSchema); // MongoDB-д хадгалах

export default Task; // Task моделийг экспортлох
