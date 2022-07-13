import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    detalle: { activo: false, id: '' }
}

const detalleSlice = createSlice({
    name: 'detalle',
    initialState,
    reducers: {
        mostrarDetalle(state, action) {
            state.detalle = action.payload
        }
    }
})

export const { mostrarDetalle } = detalleSlice.actions
export default detalleSlice.reducer