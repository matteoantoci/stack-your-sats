import React, { FC } from 'react'
import { Stack } from '@mui/material'
import { Store } from '../store'
import { Input } from './Input'
import { CurrencySelector } from './CurrencySelector'

type Props = {
  store: Store
}

export const Form: FC<Props> = ({ store }) => {
  const currencyLabel = store.currency.label
  return (
    <Stack direction="row" justifyContent="space-between" spacing={1}>
      <CurrencySelector value={store.currency.value} onChange={store.onCurrencyChange} />
      <Input
        id="initial-balance"
        value={store.startingAmount}
        onChange={store.onStartingAmountChange}
        adornment={currencyLabel}
        label="Initial balance"
      />
      <Input
        id="monthly-contribution"
        value={store.monthlyContribution}
        onChange={store.onMonthlyContributionChange}
        adornment={currencyLabel}
        label="Monthly contribution"
      />
      <Input
        id="rate"
        value={store.rate}
        onChange={store.onRateChange}
        adornment={currencyLabel}
        label="Est. Bitcoin CAGR"
      />
      <Input id="years" value={store.yearsToGrow} onChange={store.onYearsToGrowChange} label="Years" />
    </Stack>
  )
}
