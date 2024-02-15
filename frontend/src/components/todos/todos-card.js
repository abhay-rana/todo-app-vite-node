import React, { memo } from 'react';

const TodosCard = ({ todo, deleteTodo }) => {
    console.log('renders');
    return (
        <>
            <div className="border border-green-300 p-3">
                <p>{todo.description}</p>
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
            </div>
        </>
    );
};

export default memo(TodosCard);
