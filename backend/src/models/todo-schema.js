import mongoose from "mongoose";

const todoSchema= new mongoose.Schema({
    description:String
})

export const TodosDb= mongoose.model("todos",todoSchema)