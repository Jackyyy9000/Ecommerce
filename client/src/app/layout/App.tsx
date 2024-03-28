import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container'
import { ThemeProvider, createTheme} from '@mui/material/styles'

import { useState } from 'react'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? "#eaeaea" : '#121212'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>

      <Container maxWidth="lg">        
        <Catalog/>
      </Container>
      
    </ThemeProvider>
  )
}

export default App
