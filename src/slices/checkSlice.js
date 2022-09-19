import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checks: []
}

const checkSlice = createSlice({
    name: 'check',
    initialState,
    reducers: {
        addChecks(state, action) {
            const notExistInState = !state.checks.some(item => item.id == action.payload.id)
            const isAutorizado = (action.payload.estatus.toUpperCase() == 'DISPONIBLE')
            if (notExistInState && isAutorizado) {
                state.checks.push(action.payload)
            }
        },
        removeChecks(state, action) {
            const { id } = action.payload
            state.checks = state.checks.filter(item => item.id !== id)
        },
        removeAllChecks(state) {
            state.checks = []
        }
    }
})

export const { addChecks, removeChecks, removeAllChecks } = checkSlice.actions
export default checkSlice.reducer