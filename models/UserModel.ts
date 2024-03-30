import { Schema, model, models, Model } from "mongoose";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Must provide a name."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Must provide an email address."],
      unique: true,
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

const UserModel: Model<IUser> = models.User || model<IUser>("User", userSchema);

export default UserModel;
