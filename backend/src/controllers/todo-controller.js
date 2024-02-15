import { isValidObjectId } from 'mongoose';
import { TodosDb } from '../models/todo-schema.js';

export async function GetTodos(req, res) {
    try {
        const todos = await TodosDb.find({});
        return res.json({
            message: 'get all toodos',
            data: todos,
        });
    } catch (err) {
        console.error('err', err);
    }
}

export async function PostTodos(req, res) {
    try {
        const { description, id, status, title } = req.body;
        console.log('id', id);
        if (parseInt(id) === 0) {
            const create = await TodosDb.create({ description });
            console.log('create', create);
            res.json({
                message: 'successfully created the new todos',
                data: create,
            });
        } else if (isValidObjectId(id)) {
            const updated_one = await TodosDb.updateOne(
                { _id: id },
                {
                    $set: {
                        description: description,
                    },
                }
            );
            console.log('updated_one', updated_one);
            res.json({
                message: 'successfully updated the todo',
            });
        } else {
            res.status(300).json({
                message: 'id is not correct',
            });
        }
    } catch (err) {
        console.error('Error', err);
    }
}

export async function DeleteTodos(req, res) {
    try {
        const delete_todo = await TodosDb.deleteOne({ _id: req.params.id });
        res.json({
            message: 'successfully deleted',
            data: delete_todo,
        });
    } catch (err) {
        console.log(err);
    }
}
