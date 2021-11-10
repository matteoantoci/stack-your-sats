import React from 'react'
import { Chart } from './components/Chart'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'
import { Box, Container, CssBaseline, Stack, styled, Typography } from '@mui/material'

const Main = styled('main')`
  padding-top: ${theme.spacing(3)};
  padding-bottom: ${theme.spacing(3)};
`

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Main>
      <Container>
        <Stack spacing={3}>
          <Box>
            <Typography variant={'h2'} component={'h1'}>
              Stack your sats!
            </Typography>
          </Box>
          <Chart />
        </Stack>
      </Container>
    </Main>
  </ThemeProvider>
)

export default App
