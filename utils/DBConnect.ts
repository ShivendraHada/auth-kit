import mongoose from "mongoose";

export async function DBConnect() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URL ? process.env.MONGODB_URL : ""
    );
  } catch (error: any) {
    console.error(error.message);
  }
}
