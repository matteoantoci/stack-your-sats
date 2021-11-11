import { createTheme, SimplePaletteColorOptions } from '@mui/material/styles'

const isDarkMode = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

const BTC_COLOR: SimplePaletteColorOptions = {
  main: '#f7931a',
}

export const theme = createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
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
