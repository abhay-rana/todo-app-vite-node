import React, { memo, useState } from 'react';

const TodosCard = ({ todo, deleteTodo, updateTodos }) => {
    const [status, setStatus] = useState(todo.status);
    console.log('renders');
    async function changeStatus(id, status) {
        try {
            await updateTodos(id, status);
            setStatus(status);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div className="flex flex-row justify-between border border-green-300 p-3">
                <p>{todo.description}</p>
                <div className="bg-orange-400 p-4">
                    <input
                        checked={status}
                        type="checkbox"
                        onChange={(e) =>
                            changeStatus(todo._id, e.target.checked)
                        }
                    />
                </div>
                <div className="bg-red-400 p-2">
                    <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                </div>
            </div>
        </>
    );
};

export default memo(TodosCard);
