import { configureStore } from '@reduxjs/toolkit'
import detalleReducer from './slices/detalleSlice'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = configureStore({
    reducer: { detalle: detalleReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

sagaMiddleware.run(sagas)
export default store