import { createSlice } from '@reduxjs/toolkit';

import {
    CreateTodos,
    DeleteTodo,
    GetTodos,
} from '~/redux/actions/todos-actions';

const initialState = {
    todos: [],
    todosCount: 0,
    search_todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetTodos.fulfilled, (state, { payload }) => {
                state.todos = payload.data.data;
                state.todosCount = payload.data.count;
            })
            .addCase(CreateTodos.fulfilled, (state, { payload }) => {
                state.todos = state.todos.concat(payload.data.data);
                state.todosCount += 1;
            })
            .addCase(DeleteTodo.fulfilled, (state, { payload }) => {
                state.todos = state.todos.filter(
                    (todo) => todo._id !== payload.id
                );
                state.todosCount -= 1;
            });
    },
});

export default todoSlice.reducer;
