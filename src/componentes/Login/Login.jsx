import * as React from 'react'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme  } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress';

import ForgotPassword from './ForgotPassword'

import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../sagaActions'

import apiCall from '../../api/apiCall'
import isUserValidateRol from './isUserValidateRol'

const theme = createTheme({})

export default function Login() {
    let auth = useSelector((state) => state.login.login)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const [credentials, setCredentials] = React.useState({
        login: '', password: '', token: ''
    })
    const [isTokenCreated, setIsTokenCreated] = React.useState(null)
    const [messageToken, setMessageToken] = React.useState('(No generado)')
    const [loading, setLoading] = React.useState(false)
    const [submitLogin, setSubmitLogin] = React.useState(false)

    React.useEffect(() => {
        if (auth) {
            navigate('/mandamientos')
            return
        }
    }, [])

    React.useEffect(()=> {
        setMessageToken('(No generado)')
        setLoading(false)
        setIsTokenCreated(null)
    }, [credentials.login])

    React.useEffect(() => {
        if (isTokenCreated == null) return
        (isTokenCreated.estatus) ? setMessageToken('(Generado)') : setMessageToken('(No se pudo generar)')
        if (isTokenCreated.estatus) setLoading(false)
    }, [isTokenCreated])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmitLogin(true)
        let user = await apiCall('POST', 'login', 'dugrop', credentials)
        if (user.hasOwnProperty('message')) {
            alert(user.message)
            setSubmitLogin(false)
            return
        }
        if (!(Object.keys(user).length == 0)) {
            if (user.user.roles.some(rol => isUserValidateRol(rol.id))) {
                dispatch({ type: sagaActions.SET_LOGIN_DATA_USER, payload: user })
                dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: true })
                navigate("/mandamientos", { replace: true })
            } else {
                alert("Rol de usuario no Valido")
            }
        }
        setSubmitLogin(false)
    }

    const generarTokenBack = async (event) => {
        if (credentials.login.trim() == '') return
        if (!(isTokenCreated?.estatus)) setLoading(true)
        if (isTokenCreated == null) {
            let data = await apiCall('POST', 'get-token', 'dugrop', { login: credentials.login })
            setIsTokenCreated(data)
            return
        }
        if (isTokenCreated.estatus > 0) return
        let data = await apiCall('POST', 'get-token', 'dugrop', { login: credentials.login })
        setIsTokenCreated(data)
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        let newValues = { ...credentials, [name]: value }
        setCredentials({ ...newValues })
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') generarTokenBack(e)
    }

    return (
            <Container component="main" maxWidth="xs" sx={{
                        margin: 0,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
            }}>
                <CssBaseline />
                <Box
                    sx={{
                        //marginTop: 0,
                        paddingLeft: 8,
                        paddingRight: 8,
                        // paddingTop: 2,
                        // paddingBottom: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        justifyContent:'center',
                        borderRadius: '25px',
                    }}
                >
                    <img src="http://sircinet.fiscaliaveracruz.gob.mx/CI/public/img/FGE_Favion-300x300.png"
                        alt="Logo" width={137} />
                    <Typography component="h1" variant="h5" sx={{ mt: 0 }}>
                        Iniciar Sesión
                    </Typography>
                    <Box sx={{ mt: 2, mb:2 }}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField
                                sx={{ mb: 1 }}
                                required
                                fullWidth
                                id="email"
                                label="Usuario | Correo"
                                name="login"
                                autoComplete="email"
                                autoFocus
                                variant="filled"
                                size="small"
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                            <TextField
                                sx={{ mb: 1 }}
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                variant="filled"
                                size="small"
                                onClick={generarTokenBack}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                            />
                            <TextField
                                sx={{ mb: 1 }}
                                required
                                fullWidth
                                name="token"
                                label={`Token ${messageToken}`}
                                type="text"
                                id="token"
                                autoComplete="current-token"
                                variant="filled"
                                size="small"
                                onClick={generarTokenBack}
                                onKeyDown={handleKeyDown}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                // sx={{ mt: 3, mb: 2 }}
                                sx={{ mt: 3, mb: 2, backgroundColor: 'peru' }}
                                disabled={submitLogin ? true : false}
                            >
                                {(loading || submitLogin) ? <CircularProgress style={{width:'20px', height:'20px', marginRight:'10px'}} /> : ''}
                                Ingresar
                            </Button>
                        </Box>
                        <ForgotPassword />
                    </Box>
                </Box>
            </Container>
    )
}