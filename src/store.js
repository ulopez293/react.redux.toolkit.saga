import { configureStore } from '@reduxjs/toolkit'
import detalleReducer from './slices/detalleSlice'
import checkReducer from './slices/checkSlice'
import loginReducer from './slices/loginSlice'
import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
import {
    persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,
} from 'redux-persist'
import expireIn from "redux-persist-transform-expire-in";
import storage from 'redux-persist/lib/storage'

let sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const expireMiliSeconds = 1000 * (60 * 60) // 1 hour
const expirationKey = "persistencyExpiration"
const persistConfig = {
    key: 'root',
    storage,
    transforms: [expireIn(expireMiliSeconds, expirationKey, [])]
}

const rootReducer = combineReducers({
    detalle: detalleReducer,
    check: checkReducer,
    login: loginReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }).concat(middleware),
})
const persistor = persistStore(store)

sagaMiddleware.run(sagas)
export { store, persistor }