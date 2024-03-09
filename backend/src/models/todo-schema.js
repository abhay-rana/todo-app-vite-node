import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

export const TodosDb = mongoose.model('todos', todoSchema);
