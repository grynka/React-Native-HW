import { createSlice } from "@reduxjs/toolkit";

const state = {
    uid: null,
    username: null,
    avatar: null,
    email: null,
    stateChange: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, {payload}) => ({
            ...state, 
            uid: payload.uid,
            username: payload.displayName,
            avatar: payload.avatar,
            email: payload.email,
        }),
        authStateChange: (state, {payload}) => ({
            ...state, stateChange: payload.stateChange
        }),

        authSignOut: () => state
    }
})