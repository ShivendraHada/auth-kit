import mongoose from "mongoose";

export async function DBConnect() {
  try {
    // Check if the connection is already established
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    // Ensure the MongoDB URI is set
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI environment variable is not set.");
    }

    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    // Handle any errors
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
