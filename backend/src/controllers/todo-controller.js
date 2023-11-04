import { TodosDb } from "../models/todo-schema.js";

export async function GetTodos(req,res){
    try{
        await Todos.find({})
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
        await TodosDb.create({description})
    }catch(err){
        console.error("Error",err)
    }
}

export async function DeleteTodos(req,res){
    try{
        await TodosDb.deleteOne({_id:req.params.id});
        res.json({
            message:"successfully deleted"
        })
    }catch(err){
        console.log(err)
    }
}