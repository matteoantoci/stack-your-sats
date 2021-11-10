import { theme } from '../theme'
import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'

export const Quote: FC = () => (
  <Box fontStyle="italic" color={theme.palette.text.secondary}>
    <Typography variant="h5" component="p" textAlign="center">
      My prediction is a 162% CAGR (non-inflation adjusted) for the next 5 years on #Bitcoin
    </Typography>
    <Typography variant="h5" component="p" textAlign="center">
      Last 5 years was 244%.
    </Typography>
    <Typography variant="h5" component="p" textAlign="right">
      <a href="https://twitter.com/BritishHodl/status/1458019169744695296" target="_blank" rel="noopener noreferrer">
        ₿ritish Hodl
      </a>
    </Typography>
  </Box>
)
