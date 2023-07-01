import mongoose from "mongoose";

export async function DbConnection() {
  try {
    mongoose.connect(process.env.MONGO_URL!); // we are using ! coz its typescript and we tell it that we are taking guarantee that we are passing connection string
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
    connection.on("error", (error) => {
      console.log("Connection Failed" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong !");
    console.log(error);
  }
}
