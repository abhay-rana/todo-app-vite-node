import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    DELETE_TODOS,
    GET_TODOS,
    POST_TODOS,
    UPDATE_TODOS,
} from '~/constant/api-constant';

import { getToken } from '~/utils/set-tokens';

import { ProjectUrl } from '~/env';

const baseQueryWithHeaders = fetchBaseQuery({
    baseUrl: ProjectUrl,
    prepareHeaders: (headers, { getState }) => {
        // Get the token from your state or wherever it's stored
        const token = getToken();
        console.log('token', token);
        // If a token exists, append it to the headers
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        // Ensure content type is JSON
        headers.set('Content-Type', 'application/json');

        return headers;
    },
});

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: baseQueryWithHeaders,
    tagTypes: ['TODOS'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: ({ search, page, pageSize }) => ({
                url: GET_TODOS,
                method: 'POST',
                body: { search, page, pageSize },
            }),
            providesTags: ['TODOS'],
        }),
        createTodo: builder.mutation({
            query: (payload) => ({
                url: POST_TODOS,
                method: 'POST',
                body: payload,
            }),
            // Tag to refetch getTodos query after mutation
            // invalidatesTags: ['TODOS'],
            // Update state after successful mutation -> Passimistic updates
            onSuccess: (payload, variables, api) => {
                console.log({ payload, variables, api });
                // Append the new todo to the existing todos state
                const existingTodos = api.getState().todosApi.todos;
                api.setState({
                    todosApi: {
                        ...api.getState().todosApi,
                        todos: [...existingTodos, payload],
                    },
                });
            },
        }),
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `${DELETE_TODOS}/${id}`,
                method: 'GET',
            }),
            // Tag to refetch getTodos query after mutation
            invalidatesTags: ['TODOS'],
        }),
        updateTodo: builder.mutation({
            query: ({ id, status }) => ({
                url: `${UPDATE_TODOS}/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            // Tag to refetch getTodos query after mutation
            invalidatesTags: ['TODOS'],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useLazyGetTodosQuery,
    useCreateTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} = todosApi;
