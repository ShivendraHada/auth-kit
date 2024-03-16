import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
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

export default models.User || model("User", userSchema);
