// models/user.js
import mongoose, { Schema } from "mongoose";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Must provide a name."],
      unique: true,
      index: true,
      minlength: [3, "Name must be at least 3 characters long."],
      maxlength: [50, "Name must be at most 50 characters long."],
    },
    email: {
      type: String,
      required: [true, "Must provide an email address."],
      unique: true,
      index: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Must provide a password."],
      minlength: [8, "Password must be at least 8 characters long."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
