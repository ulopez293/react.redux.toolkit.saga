import { put } from 'redux-saga/effects'
import { sagaActions } from '../sagaActions'
import { setDataUserState } from '../slices/loginSlice'

function* setDataUserSaga(action) {
    try {
        yield put(setDataUserState(action.payload))
    } catch (e) {
        yield put({ type: sagaActions.SET_LOGIN_DATA_USER+'_FAILED', message: e.message })
    }
}

export default setDataUserSaga