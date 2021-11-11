import { CURRENCIES, Currency } from '../currencies'
import React, { FC } from 'react'
import { Box, MenuItem, Stack, TextField } from '@mui/material'
import { theme } from '../theme'

type Props = {
  value: string
  onChange: (value: Currency) => void
}

export const CurrencySelector: FC<Props> = ({ value, onChange }) => (
  <TextField
    select
    label="Currency"
    value={value}
    size="small"
    fullWidth={true}
    onChange={(e) => {
      const selectedIndex = CURRENCIES.findIndex((it) => it.value === e.target.value) ?? 0
      onChange(CURRENCIES[selectedIndex])
    }}
  >
    {CURRENCIES.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        <Stack direction="row" spacing={1}>
          <Box component={'span'}>{option.label}</Box>
          <Box component={'span'} color={theme.palette.text.secondary}>
            {option.value}
          </Box>
        </Stack>
      </MenuItem>
    ))}
  </TextField>
)
