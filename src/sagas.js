import { put, takeEvery } from 'redux-saga/effects'
import { mostrarDetalle } from './slices/detalleSlice'
import { sagaActions } from './sagaActions'

function* cambioDetalleSaga(action) {
    try {
        yield put(mostrarDetalle(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.CAMBIO_DETALLE_SAGA+'_FAILED', message: e.message })
    }
}

function* sagas() {
    yield takeEvery(sagaActions.CAMBIO_DETALLE_SAGA, cambioDetalleSaga)
}


export default sagas