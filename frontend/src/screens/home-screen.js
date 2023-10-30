import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetTodos } from '~/redux/actions/todos-actions';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const store = useSelector((state) => ({
        todos: state.todos_store.todos,
        search_todos: state.todos_store.search_todos,
    }));

    const [todo, setTodo] = useState({
        id: '',
        text: '',
    });
    const [search, setSearch] = useState('');
    useEffect(() => {
        dispatch(GetTodos({ search }));
    }, []);
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-6">
                <div>Todo App:-</div>
                <div className="flex flex-row gap-4">
                    <p>Enter Todo</p>
                    <input
                        value={todo.text}
                        onChange={(event) =>
                            setTodo({ ...todo, text: event.target.value })
                        }
                        placeholder="Enter Todo"
                    />
                </div>
                <div className="flex flex-row gap-4">
                    <p>Search Todo</p>
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search Todo"
                    />
                </div>
                <div>Show Todo : </div>
                {}
            </div>
        </>
    );
};

export default HomeScreen;
