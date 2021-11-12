import React from 'react'
import { Home } from './components/Home'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Container, CssBaseline, styled } from '@mui/material'

const Main = styled('main')`
  padding: ${theme.spacing(3)} 0;
`

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container>
      <Main>
        <Home />
      </Main>
    </Container>
  </ThemeProvider>
)

export default App
