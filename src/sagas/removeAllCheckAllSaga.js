import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { removeAllChecks } from '../slices/checkAllSlice'

function* removeAllCheckAllSaga(action) {
    try {
        yield put(removeAllChecks(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.REMOVE_ALL_CHECKS_ALLS_SAGA + '_FAILED', message: e.message })
    }
}

export default removeAllCheckAllSaga