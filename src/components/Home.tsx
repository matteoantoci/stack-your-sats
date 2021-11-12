import React, { FC } from 'react'
import { Box, Grid, Link, Stack, Typography } from '@mui/material'
import { Card } from './Card'
import { Form } from './Form'
import { LineChart } from './LineChart'
import { useStore } from '../store'
import { Quote } from './Quote'
import { theme } from '../theme'
import logo from '../bitcoin.svg'
import { BarChart } from './BarChart'
import { createChartData } from '../chartUtils'
import { formatCurrency } from '../currencies'

export const Home: FC = () => {
  const store = useStore()
  const data = createChartData(store)
  const last = data[data.length - 1]

  if (!last) return null

  const currency = store.currency.value
  return (
    <>
      <Typography variant={'h2'} component={'h1'} marginBottom={theme.spacing(3)}>
        Stack your sats! <img src={logo} width={parseInt(theme.spacing(5))} alt="Bitcoin logo" />
      </Typography>
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <Typography
                variant={'h6'}
                component={'h2'}
                color={theme.palette.text.secondary}
                marginBottom={theme.spacing(3)}
              >
                See how your money will grow over time with compound annual growth rate (CAGR).
              </Typography>
              <Form store={store} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <Typography
                variant={'h6'}
                component={'h2'}
                color={theme.palette.text.secondary}
                marginBottom={theme.spacing(3)}
              >
                By{' '}
                <Box component={'span'} color={theme.palette.primary.main}>
                  {last.year}
                </Box>{' '}
                your investment will be worth{' '}
                <Box component={'span'} color={theme.palette.primary.main}>
                  ${formatCurrency(last.bitcoin, currency)}
                </Box>
              </Typography>
              <BarChart data={data} currency={currency} />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <Typography
                variant={'h6'}
                component={'h2'}
                color={theme.palette.text.secondary}
                marginBottom={theme.spacing(3)}
              >
                Compare{' '}
                <Box component={'span'} color={theme.palette.primary.main}>
                  Bitcoin
                </Box>{' '}
                growth with other assets
              </Typography>
              <LineChart data={data} currency={currency} btcRate={store.rate} />
              <Link
                textAlign="right"
                fontSize={theme.typography.body2.fontSize}
                href="https://cointelegraph.com/news/bitcoin-s-compound-annual-growth-is-an-unheard-of-200-cagr"
                target="_blank"
                display={'block'}
                rel="noopener noreferrer"
              >
                Source
              </Link>
            </Card>
          </Grid>
        </Grid>
        <Quote />
      </Stack>
    </>
  )
}
