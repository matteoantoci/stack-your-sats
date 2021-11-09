import { createTheme, SimplePaletteColorOptions } from '@mui/material/styles'

const isDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

const BTC_COLOR: SimplePaletteColorOptions = {
  main: '#f2a900',
}

const GAIN_COLOR: SimplePaletteColorOptions = {
  main: '#53b987',
}

const LOSS_COLOR: SimplePaletteColorOptions = {
  main: '#eb4d5c',
}

export const theme = createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    success: GAIN_COLOR,
    error: LOSS_COLOR,
    primary: BTC_COLOR,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})
