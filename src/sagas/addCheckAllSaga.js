import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { addAllChecks } from '../slices/checkAllSlice'

function* addAllCheckSaga(action) {
    try {
        yield put(addAllChecks(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.ADD_CHECKS_ALLS_SAGA + '_FAILED', message: e.message })
    }
}

export default addAllCheckSaga