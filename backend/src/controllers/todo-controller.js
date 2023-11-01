import { TodosDb } from "../models/todo-schema.js";

export async function GetTodos(req,res){
    try{
        return res.json({
            message:"get all toodos"
        })
    }catch(err){
        console.error("err",err)
    }
}

export async function PostTodos(req,res){
    try{
        const {description}=req.body;
        TodosDb.create({description})
    }catch(err){
        console.error("Error",err)
    }
}