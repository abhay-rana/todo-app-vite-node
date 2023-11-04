import { isValidObjectId } from "mongoose";
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
        const {description,id}=req.body;
        console.log("id",id)
        if(parseInt(id)===0){
            await TodosDb.create({description})    
            res.json({
                message:"successfully created the new todos"
            })
        }else if(isValidObjectId(id)){
            await TodosDb.updateOne({_id:id},{
                $set:{
                    description:description
                }
            })
            res.json({
                message:"successfully updated the todo"
            })
        }else{
            res.status(300).json({
                message:"id is not correct"
            })
        }
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
