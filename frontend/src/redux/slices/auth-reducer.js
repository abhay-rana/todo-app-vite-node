import { createSlice } from '@reduxjs/toolkit';

import { userSignIn } from '~/redux/actions/auth-actions';

const initialState = {
    is_login: false,
    token: '',
    role: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(userSignIn.fulfilled, (state) => {
            state.is_login = true;
        });
    },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
