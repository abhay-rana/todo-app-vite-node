import mongoose from "mongoose";
import "dotenv/config";

const connectDb = () => {
	return mongoose
		.connect(process.env.DATABSE_URL)
		.then((con) => {
			console.log("Database connected");
		})
		.catch((error) => {
			console.log("error", error);
		});
};
//returns the promise for the database connection
export default connectDb;
