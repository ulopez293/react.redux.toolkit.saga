import { takeEvery } from 'redux-saga/effects'
import { sagaActions } from './sagaActions'

import cambioDetalleSaga from './sagas/cambioDetalleSaga'
import addCheckSaga from './sagas/addCheckSaga'
import removeCheckSaga from './sagas/removeCheckSaga'
import removeAllCheckSaga from './sagas/removeAllCheckSaga'
import changeLoginStateSaga from './sagas/changeLoginStateSaga'

function* sagas() {
    yield takeEvery(sagaActions.CAMBIO_DETALLE_SAGA, cambioDetalleSaga)
    yield takeEvery(sagaActions.ADD_CHECKS_SAGA, addCheckSaga)
    yield takeEvery(sagaActions.REMOVE_CHECKS_SAGA, removeCheckSaga)
    yield takeEvery(sagaActions.REMOVE_ALL_CHECKS_SAGA, removeAllCheckSaga)
    yield takeEvery(sagaActions.CHANGE_LOGIN_STATE_SAGA, changeLoginStateSaga)
}


export default sagas