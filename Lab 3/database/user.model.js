import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: String,
    password: String,
    OTPCode: String,
    isConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
