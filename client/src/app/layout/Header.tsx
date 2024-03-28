import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}


export default function Header({darkMode, handleThemeChange}: Props) {
    return (
        <AppBar position="static" sx={{mb: 4}}>
          <Toolbar>
            <Typography variant="h6">
              Ecommerce
            </Typography>
            <Switch checked={darkMode} onChange={handleThemeChange} defaultChecked color='default'/>
          </Toolbar>
        </AppBar>
    )
}