import { useState } from 'react';
import { useDispatch } from 'react-redux';

import TodosWrapper from '~/components/todos/todos-wrapper';

import { CreateTodos } from '~/redux/actions/todos-actions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        status: false,
    });
    function handleInput(key, value) {
        setInputs({ ...inputs, [key]: value });
    }
    function handleCreateTodo() {
        dispatch(CreateTodos({ ...inputs, id: 0 }));
    }
    return (
        <>
            <div className="text-center text-18">Todos</div>
            <div className="flex flex-col gap-4 border-2 border-red-400 p-4">
                <input
                    value={inputs.title}
                    onChange={(e) => handleInput('title', e.target.value)}
                    placeholder="Enter Title"
                />
                <input
                    value={inputs.description}
                    onChange={(e) => handleInput('description', e.target.value)}
                    placeholder="Enter Descriptions"
                />
                <div className="flex flex-row gap-2 border p-2">
                    <input
                        type="checkbox"
                        value={inputs.status}
                        onChange={(e) => console.log(e.target.checked)}
                    />
                    Status
                </div>
                <button onClick={handleCreateTodo}>Create A Todo</button>
            </div>
            <div className="text-center text-18">Get Todos</div>
            <TodosWrapper />
        </>
    );
};

export default HomeScreen;
