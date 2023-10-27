import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from '~/services/api-services';

import Alertify from '~/scripts/alertify';

function setToken(access_token, refresh_token) {
    console.log('access_token', { access_token, refresh_token });
    window.localStorage.setItem('token', access_token);
    window.localStorage.setItem('refresh_token', refresh_token);
}
export const userSignIn = createAsyncThunk(
    'login/user',
    async ({ email, password }) => {
        return postApi('/login', { email, password })
            .then((data) => {
                console.log('data', data);
                setToken(data.data.token, data.data.refresh_token);
                Alertify.success('User successfully logged in');
            })
            .catch((error) => console.error('err', error));
    }
);

export const Logout = createAsyncThunk('logout', () => {});
