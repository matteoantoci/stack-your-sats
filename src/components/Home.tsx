import React, { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { Card } from './Card'
import { Form } from './Form'
import { Chart } from './Chart'
import { useStore } from '../store'
import { Quote } from './Quote'
import { theme } from '../theme'
import logo from '../bitcoin.svg'

export const Home: FC = () => {
  const store = useStore()
  return (
    <>
      <Typography variant={'h2'} component={'h1'} marginBottom={theme.spacing(3)}>
        Stack your sats! <img src={logo} width={parseInt(theme.spacing(5))} alt="Bitcoin logo" />
      </Typography>
      <Stack spacing={6}>
        <Card variant="outlined">
          <Typography
            variant={'h6'}
            component={'h2'}
            color={theme.palette.text.secondary}
            marginBottom={theme.spacing(3)}
          >
            See how your money will grow over time with compound annual growth rate (CAGR).
          </Typography>
          <Stack spacing={3}>
            <Form store={store} />
            <Chart store={store} />
          </Stack>
        </Card>
        <Quote />
      </Stack>
    </>
  )
}
