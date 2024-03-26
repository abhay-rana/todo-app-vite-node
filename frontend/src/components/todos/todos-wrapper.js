import React, { memo, useCallback, useState } from 'react';

import TodosCard from '~/components/todos/todos-card';

import {
    useDeleteTodoMutation,
    useGetTodosQuery,
    useLazyGetTodosQuery,
    useUpdateTodoMutation,
} from '~/redux/actions/todos-services';

const TodosWrapper = () => {
    const [search, setSearch] = useState('');
    const { data, isLoading, isSuccess, isError, refetch } = useGetTodosQuery(
        {
            search: '',
            page: 1,
            pageSize: 10,
        },
        { refetchOnMountOrArgChange: true }
    );
    const [trigger, result, lastPromiseInfo] = useLazyGetTodosQuery();
    console.log({ trigger, result, lastPromiseInfo });

    const [DeleteTodo] = useDeleteTodoMutation();
    const [UpdateTodos] = useUpdateTodoMutation();

    const deleteTodo = useCallback((id) => {
        DeleteTodo({ id }).unwrap();
    }, []);

    function updateTodos(id, status) {
        return UpdateTodos({ id, status }).unwrap();
    }

    console.log({ data, isLoading, isSuccess, isError });

    return (
        <>
            <div>TodosWrapper</div>
            <input
                placeholder="search the todos"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {isSuccess &&
                data.data?.map((todo) => (
                    <React.Fragment key={todo._id}>
                        <TodosCard {...{ todo, deleteTodo, updateTodos }} />
                    </React.Fragment>
                ))}
            {/* this is a load more component on change the page and the pageSize refetch the useEffect */}
            {/* <LoadMore/> */}
        </>
    );
};

export default memo(TodosWrapper);
