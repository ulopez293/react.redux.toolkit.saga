import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { addChecks } from '../slices/checkSlice'

function* addCheckSaga(action) {
    try {
        yield put(addChecks(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.ADD_CHECKS_SAGA+'_FAILED', message: e.message })
    }
}

export default addCheckSaga