import React from 'react'
import './App.css'
import { Chart } from './components/Chart'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Container } from '@mui/material'

const App = () => (
  <ThemeProvider theme={theme}>
    <main>
      <Container>
        <Chart />
      </Container>
    </main>
  </ThemeProvider>
)

export default App
