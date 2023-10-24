import { createAsyncThunk } from '@reduxjs/toolkit';

import { postApi } from '~/scripts/api-services';

export const userSignIn = createAsyncThunk('sign/user', (payload) => {
    return postApi('')
        .then((data) => console.log('data', data))
        .catch((error) => console.error('err', error));
});
