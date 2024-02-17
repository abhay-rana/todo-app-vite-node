import { isValidObjectId } from 'mongoose';
import { TodosDb } from '../models/todo-schema.js';

export async function GetTodos(req, res) {
    try {
        const page = parseInt(req.body.page) || 1;
        const pageSize = parseInt(req.body.pageSize) || 10;
        if (page < 1 || pageSize < 1) {
            return res
                .status(400)
                .json({ message: 'Invalid page or pageSize value' });
        }

        const skip = (page - 1) * pageSize;
        const todos = await TodosDb.find({}).skip(skip).limit(pageSize);
        const total = await TodosDb.countDocuments();

        const totalPages = Math.ceil(total / pageSize);

        return res.json({
            message: 'get all todos',
            data: todos,
            count: total,
            page: page,
            totalPages: totalPages,
        });
    } catch (err) {
        console.error('err', err);
        return res.status(500).json({ message: 'Internal Server Error' });
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
