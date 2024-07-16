import mongoose, { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    title: String,
    description: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteSchema);
export default noteModel;
