import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    errror: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.loading = false
            state.errror = null
        },
        signInFailure: (state, action) => {
            state.loading = false
            state.errror = action.payload
        },
        signOutStart: (state) => {
            state.loading = true
        },
        signOutSuccess: (state, action) => {
            state.currentUser = null
            state.loading = false
            state.errror = null
        },
        signOutFailure: (state, action) => {
            state.loading = false
            state.errror = action.payload
        },
    }
});

export const {
    signInStart,  
    signInSuccess, 
    signInFailure,
    signOutStart,
    signOutSuccess,
    signOutFailure,
} = userSlice.actions;
export default userSlice.reducer;