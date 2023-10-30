import { createAsyncThunk } from '@reduxjs/toolkit';

import { getApi } from '~/services/api-services';

export const GetTodos = createAsyncThunk('get-search/todos', ({ search }) => {
    return getApi(`/get-todos=?${search}`)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
});
