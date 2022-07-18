import { takeEvery } from 'redux-saga/effects'
import { sagaActions } from './sagaActions'

import cambioDetalleSaga from './sagas/cambioDetalleSaga'
import addCheckSaga from './sagas/addCheckSaga'
import removeCheckSaga from './sagas/removeCheckSaga'

function* sagas() {
    yield takeEvery(sagaActions.CAMBIO_DETALLE_SAGA, cambioDetalleSaga)
    yield takeEvery(sagaActions.ADD_CHECKS_SAGA, addCheckSaga)
    yield takeEvery(sagaActions.REMOVE_CHECKS_SAGA, removeCheckSaga)
}


export default sagas