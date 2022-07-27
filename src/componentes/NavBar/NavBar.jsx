import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import Drawer from '@mui/material/Drawer'
import Avatar from '@mui/material/Avatar'

import Grid from '@mui/material/Grid'

import ListMenu from './ListMenu'

import { useSelector, useDispatch } from 'react-redux'
import { sagaActions } from '../../sagaActions'

import logo from './logo.png'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export default function NavBar() {
  let login = useSelector((state) => state.login.login)
  const dispatch = useDispatch()
  let [auth, setAuth] = React.useState(login)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const [state, setState] = React.useState({ left: false })

  React.useEffect(() => { setAuth(login) }, [login])

  if (!login) return

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const handleChange = (event) => {
    setAuth(event.target.checked)
    dispatch({ type: sagaActions.CHANGE_LOGIN_STATE_SAGA, payload: event.target.checked })
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundColor: 'silver', color: 'black',
        position: 'relative',
        top: '-7.5px', left:'-3px'
      }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {ListMenu('left', handleChange, toggleDrawer, auth)}
          </Drawer>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img src={logo} width={120} alt="" sx={{ textAlign: 'left' }} />
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, mt: 2 }}>
                Sistema de "Mandamientos"
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="div" component="div" sx={{ flexGrow: 1, mt: 3 }}>
                Name Apellido Apellido
              </Typography>
            </Grid>
          </Grid>
          {auth && (

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box >
  )
}
