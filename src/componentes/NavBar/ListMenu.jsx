import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import HomeIcon from '@mui/icons-material/Home'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Typography from '@mui/material/Typography'
import logo from './logo.png'

const ListMenu = (anchor, handleChange, toggleDrawer, auth) => (
    <Box
        sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
    >
        {/* <Typography variant="h6" component="div" sx={{
            pt: 2, pb: 2, width: '100%', backgroundColor: '#1976d2',
            color: 'white'
        }}>
            &nbsp;&nbsp;&nbsp;BUS-MANDAMIENTOS
        </Typography> */}
        <Typography variant="h6" component="div" sx={{
            pt: 1, pb: 1, width: '100%', backgroundColor: 'silver'
        }}>
            &nbsp;&nbsp;&nbsp;<img src={logo} width={120} alt="" />
        </Typography>
        <List>
            {['Inicio'].map((text, index) => (
                <ListItem key={text} disablePadding >
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <List sx={{ position: 'absolute', width: '100%', bottom: '0' }} >
            <ListItem>
                <FormGroup>
                    <FormControlLabel sx={{ width: 'fit-content' }}
                        control={
                            <Switch
                                checked={auth}
                                onChange={handleChange}
                                aria-label="login switch"
                                color="secondary"
                            />
                        }
                        label={auth ? 'Cerrar Sesion' : 'Iniciar Sesión'}
                    />
                </FormGroup>
            </ListItem>
        </List>
    </Box>
)

export default ListMenu