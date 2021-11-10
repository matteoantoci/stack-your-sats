import React from 'react'
import { Home } from './components/Home'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Container, CssBaseline, styled } from '@mui/material'

const Main = styled('main')`
  padding-top: ${theme.spacing(3)};
  padding-bottom: ${theme.spacing(3)};
`

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Main>
      <Container>
        <Home />
      </Container>
    </Main>
  </ThemeProvider>
)

export default App
