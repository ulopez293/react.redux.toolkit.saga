import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checks: []
}

const checkSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {
        addChecks(state, action) {
            state.checks.push(action.payload)
        },
        removeChecks(state, action) {
            const { id } = action.payload
            state.checks = state.checks.filter(item => item.id !== id)
        }
    }
})

export const { addChecks } = checkSlice.actions
export default checkSlice.reducer