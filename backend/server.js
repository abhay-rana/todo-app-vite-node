import express from "express";
import cors from "cors";
import "dotenv/config";
import { JWT_TOKEN, PORT } from "./env.js";
import { connectDb } from "./src/config/db.js";
import jwt from "jsonwebtoken";
import user_routes from "./src/routes/user-routes.js";
import { Authorize } from "./src/middlewares/authorize-middleware.js";

const app=express();

//* connection with the database
connectDb();

//!! middlewares
 
app.use(
	cors({
		origin: "http://localhost:3000",
	})
); //only this domain can only make requests white listings the ip-addresses

//! for parse all the data in the body request 
app.use(express.json());
//! routes 
app.use("/",user_routes)

app.get("/",(req,res)=>{
    res.send(`<h1>hello there</h1>`)
})

app.get("/logout",Authorize,(req,res)=>{
    res.json({
        message:"You are successfully logout"
    })
})

app.post("/body",(req,res)=>{
    const {username,password}=req.body;
    console.log("username",{username,password})
    res.json({
        username,password
    })
})

app.get("/protected",Authorize,(req,res)=>{
    res.send("Protected routes")
});

app.get("/refresh",Authorize,(req,res)=>{
    const {user}=req;
    const token=jwt.sign({id:user._id,username:user.username},JWT_TOKEN,{expiresIn: "5m"});
    res.send({token})
});

app.listen(PORT,()=>{
    console.log(`listen at port ${PORT}`);
});