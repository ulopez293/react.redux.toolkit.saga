import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    login: false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        changeLoginState(state, action) {
            state.login = action.payload
        }
    }
})

export const { changeLoginState } = loginSlice.actions
export default loginSlice.reducer