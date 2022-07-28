import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    login: false,
    user: {},
    access_token: null
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginState(state, action) {
            state.login = action.payload
        },
        setDataUserState(state, action) {
            state.user = action.payload.user
            state.access_token = action.payload.access_token
        }
    }
})

export const { changeLoginState, setDataUserState } = loginSlice.actions
export default loginSlice.reducer