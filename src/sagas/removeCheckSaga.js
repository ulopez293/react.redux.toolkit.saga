import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { removeChecks } from '../slices/checkSlice'

function* removeCheckSaga(action) {
    try {
        yield put(removeChecks(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.REMOVE_CHECKS_SAGA+'_FAILED', message: e.message })
    }
}

export default removeCheckSaga