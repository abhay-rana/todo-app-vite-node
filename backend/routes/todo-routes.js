import express from "express";

import { createTodo, deleteTodoById, getAlltodos, getTodoById, updateTodoById } from "~/controller/todoController.js";

import isAuthorizedUSer from "~/middleware/authorized-middleware.js";
import isAuthenticatedUser from "~/middleware/authentication-middleware.js";

const router = express.Router();

router.route("/todos").get(isAuthenticatedUser, isAuthorizedUSer("admin", "user", "teacher"), getAlltodos);

router.route("/todos/:id").get(isAuthenticatedUser, isAuthorizedUSer("admin", "user"), getTodoById);

router.route("/todos/create/new").post(isAuthenticatedUser, isAuthorizedUSer("admin"), createTodo);

router.route("/todos/update/:id").put(isAuthenticatedUser, isAuthorizedUSer("admin"), updateTodoById);

router.route("/todos/delete/:id").delete(isAuthenticatedUser, isAuthorizedUSer("teacher"), deleteTodoById);

export default router;
