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
    status: Boolean,
});

export const TodosDb = mongoose.model('todos', todoSchema);
