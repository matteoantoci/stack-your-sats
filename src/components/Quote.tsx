import { theme } from '../theme'
import React, { FC } from 'react'
import { Box, Link, Stack, styled, Typography } from '@mui/material'

const Wrapper = styled(Box)`
  width: 100%;
  padding: 0 ${theme.spacing(3)};

  @media (min-width: 420px) {
    width: 50%;
  }
`

export const Quote: FC = () => (
  <Stack direction="row" justifyContent="center">
    <Wrapper>
      <Typography variant="h6" component="p" textAlign="center" fontStyle="italic" color={theme.palette.text.secondary}>
        "My prediction is a 162% CAGR (non-inflation adjusted) for the next 5 years on #Bitcoin. Last 5 years was 244%."
      </Typography>
      <Typography variant="h6" component="p" textAlign="right" color={theme.palette.text.secondary}>
        <Link
          href="https://twitter.com/BritishHodl/status/1458019169744695296"
          target="_blank"
          rel="noopener noreferrer"
        >
          ₿ritish Hodl
        </Link>
      </Typography>
    </Wrapper>
  </Stack>
)
