import React, { FC } from 'react'
import { Grid } from '@mui/material'
import { Store } from '../store'
import { Input } from './Input'
import { CurrencySelector } from './CurrencySelector'

type Props = {
  store: Store
}

export const Form: FC<Props> = ({ store }) => {
  const currencyLabel = store.currency.label
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CurrencySelector value={store.currency.value} onChange={store.onCurrencyChange} />
        </Grid>
        <Grid item xs={6} md={2}>
          <Input
            id="initial-balance"
            value={store.startingAmount}
            onChange={store.onStartingAmountChange}
            adornment={currencyLabel}
            label="Initial balance"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Input
            id="monthly-contribution"
            value={store.monthlyContribution}
            onChange={store.onMonthlyContributionChange}
            adornment={currencyLabel}
            label="Monthly contribution"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Input
            id="rate"
            value={store.rate}
            onChange={store.onRateChange}
            adornment={currencyLabel}
            label="Est. Bitcoin CAGR"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <Input id="years" value={store.yearsToGrow} onChange={store.onYearsToGrowChange} label="Years" />
        </Grid>
      </Grid>
    </>
  )
}
