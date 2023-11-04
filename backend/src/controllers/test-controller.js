import { isValidId } from "../utils/valid-id.js";

export async function CheckId(req,res){
    try{
        const id=req.params.id;
        console.log(
            isValidId(id)
        )
        res.json({
            message:`the id is _id:${id}`
        });
    }catch(err){
        console.error(err)
    }
}