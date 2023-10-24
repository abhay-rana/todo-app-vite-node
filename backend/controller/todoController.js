import { Todo } from "~/models/todoSchema";

export const createTodo = async (req, res, next) => {
	try {
		Todo.create(req.body);
		res.json({ message: "new todo has been created" });
		// Todo.create(req.body,(err,data)=>{
		// 	res.json(data);
		// })
	} catch (error) {
		next(error); //next middleware in the queue
	}
};

export const getAlltodos = async (req, res, next) => {
	try {
		const todo = await Todo.find({}); //to find all the documents
		res.json({ todo });
	} catch (error) {
		next(error);
	}
};

export const getTodoById = async (req, res, next) => {
	try {
		const todo = await Todo.findById(req.params.id); //to find all the documents
		res.json({ todo });
	} catch (error) {
		next(error);
	}
};

export const updateTodoById = async (req, res) => {
	try {
		await Todo.findByIdAndUpdate(req.params.id, req.body);
		res.json({ message: "to-do has been updated successfully" });
	} catch (error) {
		console.log(error);
	}
};

export const deleteTodoById = async (req, res) => {
	try {
		const todo = await Todo.findById(req.params.id);
		todo.remove();
		res.json({ message: "to-do has been deleted successfully" });
	} catch (error) {
		console.log(error);
	}
};


