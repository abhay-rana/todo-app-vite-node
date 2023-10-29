import express from "express";
import cors from "cors";
import "dotenv/config";
import {  PORT } from "./env.js";
import { connectDb } from "./src/config/db.js";

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

app.get("/protected",Authorize,(req,res)=>{
    res.send("Protected routes")
});

app.listen(PORT,()=>{
    console.log(`listen at port ${PORT}`);
});