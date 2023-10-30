import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    search_todos: [],
};

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
});

export default todoSlice.reducer;
