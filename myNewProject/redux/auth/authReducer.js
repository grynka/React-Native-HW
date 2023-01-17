import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        uid: null,
        username: null
    },
    reducers: {
        updateUserProfile: (state, {payload}) => ({
            ...state, 
            username: payload.username,
        })
    }
})