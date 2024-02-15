import { createSlice } from '@reduxjs/toolkit';

import { Logout, UserSignIn } from '~/redux/actions/auth-actions';

const initialState = {
    is_login: false,
    token: '',
    role: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(UserSignIn.fulfilled, (state) => {
            state.is_login = true;
        });
        builder.addCase(Logout.fulfilled, (state) => {
            state.is_login = false;
        });
    },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
