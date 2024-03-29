
import Header from "./Header";

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container'
import { ThemeProvider, createTheme} from '@mui/material/styles'

import { Outlet } from 'react-router-dom' 

import { useState } from 'react'
import { ToastContainer } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'

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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>

      <Container maxWidth="lg">        
        <Outlet />
      </Container>
      
    </ThemeProvider>
  )
}

export default App
