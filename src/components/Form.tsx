import React, { FC } from 'react'
import { Box, FormControl, MenuItem, Stack, TextField } from '@mui/material'
import { theme } from '../theme'
import { CURRENCIES } from '../currencies'
import { Store } from '../store'

const toInt = (value: string) => {
  return value && value.length ? parseInt(value) : 0
}

type Props = {
  store: Store
}

export const Form: FC<Props> = ({ store }) => {
  const {
    currency,
    onCurrencyChange,
    startingAmount,
    onStartingAmountChange,
    monthlyContribution,
    onMonthlyContributionChange,
    rate,
    onRateChange,
    yearsToGrow,
    onYearsToGrowChange,
  } = store
  return (
    <FormControl>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <TextField
          select
          label="Currency"
          value={currency.value}
          size="small"
          onChange={(e) => {
            const selectedIndex = CURRENCIES.findIndex((it) => it.value === e.target.value) ?? 0
            onCurrencyChange(CURRENCIES[selectedIndex])
          }}
        >
          {CURRENCIES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <Stack direction="row" spacing={0.5}>
                <Box component={'span'}>{option.label}</Box>
                <Box component={'span'} color={theme.palette.text.secondary}>
                  {option.value}
                </Box>
              </Stack>
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Initial balance"
          value={startingAmount}
          type="number"
          size="small"
          onChange={(e) => onStartingAmountChange(toInt(e.target.value))}
        />
        <TextField
          label="Monthly contribution"
          type="number"
          value={monthlyContribution}
          size="small"
          onChange={(e) => onMonthlyContributionChange(toInt(e.target.value))}
        />
        <TextField
          label="Est. Bitcoin CAGR"
          type="number"
          defaultValue={rate}
          size="small"
          onChange={(e) => onRateChange(toInt(e.target.value))}
        />
        <TextField
          label="Years"
          type="number"
          value={yearsToGrow}
          size="small"
          onChange={(e) => onYearsToGrowChange(toInt(e.target.value))}
        />
      </Stack>
    </FormControl>
  )
}
