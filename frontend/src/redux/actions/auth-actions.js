import { createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN } from '~/constant/api-constant';

import { getApi, postApi } from '~/services/api-services';

import { removeToken, setToken } from '~/utils/set-tokens';

import Alertify from '~/scripts/alertify';

export const UserSignIn = createAsyncThunk(
    'UserSignIn',
    async ({ ...payload }, { dispatch, getState }) => {
        try {
            const res = await postApi(LOGIN, { ...payload });
            return { res };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);

export const Logout = createAsyncThunk('logout', () => {
    return getApi('/logout')
        .then((data) => {
            console.log('data', data);
            removeToken();
        })
        .catch((error) => console.log('error', error));
});

export const ProtectedRoutes = createAsyncThunk('login/user', () => {
    return getApi('/protected')
        .then((data) => console.log('Data', data))
        .catch((error) => console.log('err', error));
});

export const ChangePasswordDatabase = createAsyncThunk(
    '/changePassword',
    ({ password, confirm_password, old_password }) => {
        return postApi('/change-password', {
            password,
            confirm_password,
            old_password,
        })
            .then((data) => {
                console.log(data);
                Alertify.success(data.data.message);
            })
            .catch((error) => {
                console.error(error);
                Alertify.error(error.message);
            });
    }
);
