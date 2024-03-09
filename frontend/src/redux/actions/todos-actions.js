import { createAsyncThunk } from '@reduxjs/toolkit';
import { DELETE_TODOS, GET_TODOS, POST_TODOS } from '~/constant/api-constant';

import { getApi, postApi } from '~/services/api-services';

import Alertify from '~/scripts/alertify';

export const CreateTodos = createAsyncThunk(
    'CreateTodos',
    async ({ ...payload }, { dispatch, getState }) => {
        try {
            const res = await postApi(POST_TODOS, { ...payload });
            return { res };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);

export const GetTodos = createAsyncThunk(
    'GetTodos',
    async ({ _ }, { dispatch, getState }) => {
        try {
            const res = await postApi(GET_TODOS);
            return { res };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);

export const DeleteTodo = createAsyncThunk(
    'DeleteTodo',
    async ({ id }, { dispatch, getState }) => {
        try {
            const res = await getApi(`${DELETE_TODOS}/${id}`);
            return { res, id };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);
