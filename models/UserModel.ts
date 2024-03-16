import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a name."],
      unique: [true, "Must be unique"],
    },
    email: {
      type: String,
      required: [true, "Must provide a emailaddress."],
      unique: [true, "Must be unique"],
    },
    password: {
      type: String,
      required: [true, "Must provide a password."],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
