import mongoose from "mongoose";
import getEnv from "./envConfig";

export default async function DBConnect() {
  try {
    const { MONGODB_URI } = getEnv();
    // Check if the connection is already established
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // Connect to the MongoDB database
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    // Handle any errors
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
