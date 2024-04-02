import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import {Link, NavLink} from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge';
import {ShoppingCart} from '@mui/icons-material';
import Box from '@mui/material/Box';
import { useAppSelector } from '../store/configureStore'
import SignedInMenu from './SignedInMenu'

const midLinks = [
  {title: 'catalog', path: '/catalog'},
  {title: 'about', path: '/about'},
  {title: 'contact', path: '/contact'},
]

const rightLinks = [
  {title: 'login', path: '/login'},
  {title: 'register', path: '/register'},
]

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

const navStyles = {
    color: 'inherit', 
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': { color: 'grey.500' },
    '&.active': { color: 'text.secondary' }
}


export default function Header({darkMode, handleThemeChange}: Props) {
    const {basket} = useAppSelector(state => state.basket);
    const {user} = useAppSelector(state => state.account)
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <AppBar position="static" sx={{mb: 4}}>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box display='flex' alignItems='center'>
              <Typography variant="h6" 
                component={NavLink} 
                to='/' 
                sx={navStyles}
                >
                Ecommerce
              </Typography>
              <Switch checked={darkMode} onChange={handleThemeChange} defaultChecked color='default'/>
            </Box>
            
            <List sx={{display: 'flex'}}>
              {midLinks.map(({title, path}) => (
                <ListItem 
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>

            <Box display='flex' alignItems='center'>
              <IconButton component={Link} to='/basket' size="large" edge='start' color='inherit' sx={{mr: 2}}>
                <Badge badgeContent={itemCount} color='secondary'>
                  <ShoppingCart></ShoppingCart>
                </Badge>
              </IconButton>

                { user ? <SignedInMenu /> : 
                  <List sx={{display: 'flex'}}>
                    {rightLinks.map(({title, path}) => (
                      <ListItem 
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                      >
                        {title.toUpperCase()}
                      </ListItem>
                    ))}
                  </List>
                }
            </Box>
          </Toolbar>
        </AppBar>
    )
}