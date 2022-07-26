import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { changeLoginState } from '../slices/loginSlice'

function* changeLoginStateSaga(action) {
    try {
        yield put(changeLoginState(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA+'_FAILED', message: e.message })
    }
}

export default changeLoginStateSaga