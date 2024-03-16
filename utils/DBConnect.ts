import mongoose from "mongoose";

export async function DBConnect() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL ? process.env.MONGODB_URL : ""
    );
    console.log("Connected to DB");
  } catch (error: any) {
    console.error(error.message);
  }
}
