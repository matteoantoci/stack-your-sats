import React, { FC } from 'react'
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'

type Props = {
  id: string
  label: string
  startAdornment?: string
  endAdornment?: string
  value: string | number
  onChange: (value: number) => void
}

const toInt = (value: string) => {
  return value && value.length ? parseInt(value) : 0
}

export const Input: FC<Props> = ({ id, label, value, startAdornment, endAdornment, onChange }) => (
  <FormControl fullWidth={true}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <OutlinedInput
      id={id}
      value={value}
      fullWidth={true}
      onChange={(e) => onChange(toInt(e.target.value))}
      startAdornment={startAdornment ? <InputAdornment position="start">{startAdornment}</InputAdornment> : null}
      endAdornment={endAdornment ? <InputAdornment position="end">{endAdornment}</InputAdornment> : null}
      label={label}
      size="small"
    />
  </FormControl>
)
