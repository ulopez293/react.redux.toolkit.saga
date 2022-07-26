import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { mostrarDetalle } from '../slices/detalleSlice'

function* cambioDetalleSaga(action) {
    try {
        yield put(mostrarDetalle(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.CAMBIO_DETALLE_SAGA+'_FAILED', message: e.message })
    }
}

export default cambioDetalleSaga