import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: false,
    },
    dueDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todoModel", todoSchema);
export default todoModel;
