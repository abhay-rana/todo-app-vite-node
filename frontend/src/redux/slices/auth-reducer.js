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
    reducers: {
        Logout: (state) => {
            console.log('state', state);
            state.is_login = false;
            state.role = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userSignIn.fulfilled, (state) => {
            state.is_login = true;
        });
    },
});

export const { setLogin, Logout } = authSlice.actions;
export default authSlice.reducer;
