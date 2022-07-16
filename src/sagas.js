import { takeEvery } from 'redux-saga/effects'
import { sagaActions } from './sagaActions'
import cambioDetalleSaga from './sagas/cambioDetalleSaga'

function* sagas() {
    yield takeEvery(sagaActions.CAMBIO_DETALLE_SAGA, cambioDetalleSaga)
}


export default sagas