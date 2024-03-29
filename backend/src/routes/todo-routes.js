import express from 'express';
import {
    DeleteTodos,
    GetTodos,
    PostTodos,
    UpdateTodos,
} from '../controllers/todo-controller.js';
import { Authorize } from '../middlewares/authorize-middleware.js';

const todo_routes = express.Router();

todo_routes.route('/get-todos').post(Authorize, GetTodos);
todo_routes.route('/post-todos').post(Authorize, PostTodos);
todo_routes.route('/update-todos/:id').patch(Authorize, UpdateTodos);
todo_routes.route('/delete-todos/:id').get(DeleteTodos);
export default todo_routes;
