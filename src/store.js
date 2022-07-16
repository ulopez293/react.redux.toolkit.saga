import { configureStore } from '@reduxjs/toolkit'
import detalleReducer from './slices/detalleSlice'
import checkReducer from './slices/checkSlice'

import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const store = configureStore({
    reducer: { detalle: detalleReducer, check: checkReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
})

sagaMiddleware.run(sagas)
export default store