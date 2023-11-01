import mongoose from "mongoose";

const todoSchema= new mongoose.Schema({
    description:{
        type:String,
        required:true
    }
})

export const TodosDb= mongoose.model("todos",todoSchema)