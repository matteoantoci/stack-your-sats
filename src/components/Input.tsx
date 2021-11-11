import React, { FC } from 'react'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'

type Props = {
  id: string
  label: string
  adornment?: string
  value: string | number
  onChange: (value: number) => void
}

const toInt = (value: string) => {
  return value && value.length ? parseInt(value) : 0
}

export const Input: FC<Props> = ({ id, label, value, adornment, onChange }) => (
  <FormControl fullWidth={true}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      value={value}
      fullWidth={true}
      onChange={(e) => onChange(toInt(e.target.value))}
      startAdornment={adornment ? <InputAdornment position="start">{adornment}</InputAdornment> : null}
      label={label}
      size="small"
    />
  </FormControl>
)
