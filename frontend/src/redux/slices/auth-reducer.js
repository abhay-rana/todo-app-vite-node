import { createSlice } from '@reduxjs/toolkit';

import {
    Logout,
    UserSignIn,
    saveTokenToLocalStorage,
} from '~/redux/actions/auth-actions';

const initialState = {
    is_login: false,
    token: '',
    refresh_token: '',
    role: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(UserSignIn.fulfilled, (state, { payload }) => {
            state.is_login = true;
            state.token = payload.res.data.token;
            state.refresh_token = payload.res.data.refresh_token;
            saveTokenToLocalStorage(
                payload.res.data.token,
                payload.res.data.refresh_token
            );
        });
        builder.addCase(Logout.fulfilled, (state) => {
            state.is_login = false;
        });
    },
});

export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
