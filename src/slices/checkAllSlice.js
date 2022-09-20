import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    checks: []
}

const checkAllSlice = createSlice({
    name: 'checkAll',
    initialState,
    reducers: {
        addAllChecks(state, action) {
            const notExistInState = !state.checks.some(item => item == action.payload)
            if (notExistInState) {
                state.checks.push(action.payload)
            }
        },
        removeAllChecks(state, action) {
            if (action.payload == undefined) return
            let auxstate = state.checks.reduce((a, b) => {
                if (b != action.payload) a.push(b)
                return a
            }, [])
            state.checks = auxstate
        }
    }
})

export const { addAllChecks, removeAllChecks } = checkAllSlice.actions
export default checkAllSlice.reducer