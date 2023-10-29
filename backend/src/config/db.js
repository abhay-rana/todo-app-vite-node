import mongoose from "mongoose";
import { DATABASE_URL } from "../../env.js";

export async function connectDb(){
    try{
        await mongoose.connect(DATABASE_URL);
        console.log("successfully connected to the mongodb server")
    }catch(error){
        console.log("Database Connection Err:",error)
    } 
}