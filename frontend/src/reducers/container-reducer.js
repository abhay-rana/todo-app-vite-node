import { createSlice } from '@reduxjs/toolkit';

const LOCAL_STATE = {
    counter: 0,
};
const STORED_STATE = {
    name: '',
    city: '',
};

const initialState = {
    ...LOCAL_STATE,
    ...STORED_STATE,
};

const containerSlice = createSlice({
    name: 'container',
    initialState,
    reducers: {
        ResetLocalState: (state, action) => {
            console.log('this is container reducer');
            return { ...state, ...LOCAL_STATE };
        },
        Logout: (state, action) => {},
        SetContainerDetails: (state, action) => {
            state[action.payload.key] = action.payload.value;
        },
        IncreaseContainerCounter: (state) => {
            state.counter += 1;
        },
    },
});

export const {
    ResetLocalState,
    Logout,
    SetContainerDetails,
    IncreaseContainerCounter,
} = containerSlice.actions;
export default containerSlice.reducer;
