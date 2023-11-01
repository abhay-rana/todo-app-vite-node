import express from "express";
import { GetTodos, PostTodos } from "../controllers/todo-controller.js";
import { Authorize } from "../middlewares/authorize-middleware.js";

const todo_routes=express.Router();

todo_routes.route("/get-todos").get(Authorize,GetTodos)
todo_routes.route("/post-todos").post(Authorize,PostTodos)
export default todo_routes;