import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DELETE_TODOS,
    GET_TODOS,
    POST_TODOS,
    UPDATE_TODOS,
} from '~/constant/api-constant';

import { getApi, patchApi, postApi } from '~/services/api-services';

import Alertify from '~/scripts/alertify';

export const GetTodos = createAsyncThunk(
    'GetTodos',
    async ({ _, cancelToken }, { dispatch, getState }) => {
        try {
            const { data } = await postApi(GET_TODOS, {}, {}, cancelToken);
            return { data };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);

export const CreateTodos = createAsyncThunk(
    'CreateTodos',
    async ({ ...payload }, { dispatch, getState }) => {
        try {
            const { data } = await postApi(POST_TODOS, { ...payload });
            return { data };
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
            const data = await getApi(`${DELETE_TODOS}/${id}`);
            return { data, id };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);

export const UpdateTodos = createAsyncThunk(
    'UpdateTodos',
    async ({ id, status }, { dispatch, getState }) => {
        try {
            const { data } = await patchApi(`${UPDATE_TODOS}/${id}`, {
                status,
            });
            Alertify.success('item is succesfully updated');
            return { data, id };
        } catch (error) {
            console.error(error);
            Alertify.error(error.message[0]);
            return Promise.reject();
        }
    }
);
