import React, { FC } from 'react'
import { Stack, Typography } from '@mui/material'
import { Card } from './Card'
import { Form } from './Form'
import { Chart } from './Chart'
import { useStore } from '../store'
import { Quote } from './Quote'
import { theme } from '../theme'
import logo from '../bitcoin.svg'

const PageHeader: FC = () => (
  <Stack spacing={1}>
    <Typography variant={'h2'} component={'h1'}>
      Stack your sats! <img src={logo} width={parseInt(theme.spacing(5))} alt="Bitcoin logo" />
    </Typography>
    <Typography variant={'h5'} component={'h2'} color={theme.palette.text.secondary}>
      See how your money will grow over time with Bitcoin compound annual growth rate (CAGR).
    </Typography>
  </Stack>
)

export const Home: FC = () => {
  const store = useStore()
  return (
    <Stack spacing={6}>
      <PageHeader />
      <Card variant="outlined">
        <Stack spacing={3}>
          <Form store={store} />
          <Chart store={store} />
        </Stack>
      </Card>
      <Quote />
    </Stack>
  )
}
