import './Theme.css'

import { useSelector, useDispatch } from 'react-redux'

function ThemeBackground({ children }){
    let auth = useSelector((state) => state.login.login)
    return (
        <div className={auth ? '':'App'}>
            {children}
        </div>
    )
}

export default ThemeBackground