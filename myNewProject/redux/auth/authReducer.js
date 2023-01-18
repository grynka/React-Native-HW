import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        uid: null,
        username: null,
        avatar: null,
        email: null,
        stateChange: null,
    },
    reducers: {
        updateUserProfile: (state, {payload}) => ({
            ...state, 
            uid: payload.uid,
            username: payload.displayName,
            avatar: payload.avatar,
            email: payload.email,
        }),
        authStateChange: (state, {payload}) => ({
            ...state, stateChange: payload.state
        })

    }
})