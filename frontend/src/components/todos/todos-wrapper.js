import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import TodosCard from '~/components/todos/todos-card';

import { DeleteTodo, GetTodos } from '~/redux/actions/todos-actions';

const TodosWrapper = () => {
    const [todos, setTodos] = useState([]);

    const dispatch = useDispatch();

    const deleteTodo = useCallback((id) => {
        dispatch(DeleteTodo({ id }))
            .unwrap()
            .then(({ id }) => {
                setTodos((todos) => todos.filter((item) => item._id !== id));
            });
    }, []);

    function editTodo(id) {}

    useEffect(() => {
        dispatch(GetTodos({}))
            .unwrap()
            .then((data) => {
                setTodos(data.res.data);
            });
        return () => {};
    }, []);

    return (
        <>
            <div>TodosWrapper</div>
            {todos.map((todo) => (
                <React.Fragment key={todo._id}>
                    <TodosCard {...{ todo, deleteTodo }} />
                </React.Fragment>
            ))}
        </>
    );
};

export default memo(TodosWrapper);
