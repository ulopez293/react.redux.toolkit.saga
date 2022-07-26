import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

function Copyright(props) {

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
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