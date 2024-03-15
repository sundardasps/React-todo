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
    type:{
       type:String,
       required:true
    },
    status: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("todoModel", todoSchema);
export default todoModel;
