import mongoose from "mongoose";

const todosSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			minLength: 3,
			maxLength: 60,
			unique: true,
		},
		description: String,
		status: Boolean,
		role: {
			type: String,
			required: true,
			default: "user",
		},
	},
	{ timestamps: true }
);

export const Todo = mongoose.model("Todos", todosSchema);
