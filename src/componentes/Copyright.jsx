import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { useSelector } from 'react-redux'
function Copyright() {
    let auth = useSelector((state) => state.login.login)
    return (
        <Typography variant="body2" color="text.secondary" align="center"
            sx={{
                pt: 2, pb: 2, mt: 4, mb: 0,
                backgroundColor: 'silver', color: 'black',
                position: (auth) ? 'absolute' : '',
                width:'100%',
                left: (auth)  ? '-2.7px' : ''
            }}
        >
            {'Copyright © '}
            <Link color="inherit" href="http://fiscaliaveracruz.gob.mx/" target="_blank" >
                FGE
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

export default Copyright