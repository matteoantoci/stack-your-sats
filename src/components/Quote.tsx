import { theme } from '../theme'
import React, { FC } from 'react'
import { Box, Stack, Typography } from '@mui/material'

export const Quote: FC = () => (
  <Stack direction="row" justifyContent="center">
    <Box width="50%">
      <Typography variant="h6" component="p" textAlign="center" fontStyle="italic" color={theme.palette.text.secondary}>
        "My prediction is a 162% CAGR (non-inflation adjusted) for the next 5 years on #Bitcoin. Last 5 years was 244%."
      </Typography>
      <Typography variant="h6" component="p" textAlign="right" color={theme.palette.text.secondary}>
        <a href="https://twitter.com/BritishHodl/status/1458019169744695296" target="_blank" rel="noopener noreferrer">
          ₿ritish Hodl
        </a>
      </Typography>
    </Box>
  </Stack>
)
