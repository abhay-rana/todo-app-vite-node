import mongoose from "mongoose";

export function isValidId(id){
    return mongoose.isValidObjectId(id);
}

