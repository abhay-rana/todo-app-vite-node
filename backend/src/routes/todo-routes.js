import express from "express";
import { DeleteTodos, GetTodos, PostTodos } from "../controllers/todo-controller.js";
import { Authorize } from "../middlewares/authorize-middleware.js";

const todo_routes=express.Router();

todo_routes.route("/get-todos").get(Authorize,GetTodos)
todo_routes.route("/post-todos").post(Authorize,PostTodos)
todo_routes.route("/delete-todos/:id").get(DeleteTodos)
export default todo_routes;

