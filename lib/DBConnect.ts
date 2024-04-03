import mongoose from "mongoose";

export async function DBConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set.");
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
