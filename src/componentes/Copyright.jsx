import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { useSelector } from 'react-redux'
function Copyright() {
    //let auth = useSelector((state) => state.login.login)
    return (
        <Typography variant="body2" color="text.secondary" align="center"
            sx={{
                pt: 2, pb: 4, mt: 4, mb: 0,
                backgroundColor: 'silver', color: 'black',
                clear: 'both',
                position: 'absolute',
                bottom: '0',
                width: '100%',
                height: '20px',
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