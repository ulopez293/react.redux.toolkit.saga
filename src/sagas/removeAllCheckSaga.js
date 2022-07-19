import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { removeAllChecks } from '../slices/checkSlice'

function* removeAllCheckSaga(action) {
    try {
        yield put(removeAllChecks())
    } catch (e) {
        yield put({ type: sagaActions.REMOVE_ALL_CHECKS_SAGA+'_FAILED', message: e.message })
    }
}

export default removeAllCheckSaga