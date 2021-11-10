import React, { FC, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { theme } from '../theme'
import { Box, FormControl, MenuItem, Paper, Stack, styled, TextField, Typography } from '@mui/material'
import Big from 'big.js'
import numeral from 'numeral'

const FONT_SIZE = theme.typography.fontSize

export const getIntSpacing = (spacing: number): number => parseInt(theme.spacing(spacing), 10)

type ChartData = {
  year: string
  interests: Big
  contributions: Big
  total: Big
}

type ChartArgs = {
  yearsToGrow: number
  startingAmount: number
  monthlyContribution: number
  rate: number
}

const createChartData = (args: ChartArgs) => {
  const currentYear = new Date().getFullYear()
  const startingAmount = new Big(args.startingAmount)
  const yearlyContribution = new Big(args.monthlyContribution).mul(12)
  const monthlyRate = new Big(args.rate).div(100).plus(1)

  const chartData: ChartData[] = Array(args.yearsToGrow)
    .fill(undefined)
    .reduce((chartDataAcc: ChartData[], _, year): ChartData[] => {
      const prev = chartDataAcc[year - 1]
      const prevTotal = prev ? prev.total : startingAmount
      const contributions = startingAmount.plus(yearlyContribution.mul(year + 1))

      const total = prevTotal.mul(monthlyRate).plus(yearlyContribution).round()

      return [
        ...chartDataAcc,
        {
          year: (currentYear + year).toString(),
          contributions,
          interests: total.minus(contributions),
          total,
        },
      ]
    }, [] as ChartData[])

  chartData.unshift({
    year: 'Start',
    contributions: startingAmount,
    interests: Big(0),
    total: startingAmount,
  })

  return chartData
}

const Card = styled(Paper)`
  padding: ${theme.spacing(3)};
  height: 100%;
`

type Currency = {
  readonly value: string
  readonly label: string
}

const CURRENCIES = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'GBP',
    label: '£',
  },
] as const

const formatAxisValue = (value: number) => {
  const formatted = numeral(value).format(`(0a)`)
  return value > 1000000 ? formatted.toUpperCase() : formatted
}

const toInt = (value: string) => {
  return value && value.length ? parseInt(value) : 0
}

export const Chart: FC = () => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[1])
  const [yearsToGrow, setYearsToGrow] = useState(5)
  const [startingAmount, setStartingAmount] = useState(1000)
  const [monthlyContribution, setMonthlyContribution] = useState(100)
  const [rate, setRate] = useState(162)

  const data = createChartData({
    yearsToGrow,
    startingAmount,
    monthlyContribution,
    rate,
  })

  return (
    <Card>
      <Stack spacing={3}>
        <Typography variant={'h6'} component={'h2'} color={theme.palette.text.secondary}>
          See how your money will grow over time with Bitcoin compound annual growth rate (CAGR).
        </Typography>
        <FormControl>
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <TextField
              select
              label="Currency"
              value={currency.value}
              size="small"
              onChange={(e) => {
                const selectedIndex = CURRENCIES.findIndex((it) => it.value === e.target.value) ?? 0
                setCurrency(CURRENCIES[selectedIndex])
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
              onChange={(e) => setStartingAmount(toInt(e.target.value))}
            />
            <TextField
              label="Monthly contribution"
              type="number"
              value={monthlyContribution}
              size="small"
              onChange={(e) => setMonthlyContribution(toInt(e.target.value))}
            />
            <TextField
              label="Est. Bitcoin CAGR"
              type="number"
              defaultValue={rate}
              size="small"
              onChange={(e) => setRate(toInt(e.target.value))}
            />
            <TextField
              label="Years"
              type="number"
              value={yearsToGrow}
              size="small"
              onChange={(e) => setYearsToGrow(toInt(e.target.value))}
            />
          </Stack>
        </FormControl>

        <ResponsiveContainer height={getIntSpacing(80)}>
          <BarChart data={data}>
            <CartesianGrid opacity={0.3} />
            <XAxis dataKey="year" tick={{ fontSize: FONT_SIZE }} />
            <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: FONT_SIZE }} />
            <Tooltip
              formatter={(value: number) =>
                new Intl.NumberFormat(navigator.language, {
                  style: 'currency',
                  currency: currency.value,
                  maximumFractionDigits: 0,
                  currencyDisplay: 'narrowSymbol',
                }).format(value)
              }
              contentStyle={{
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.background.default,
                fontSize: FONT_SIZE,
                borderRadius: `${theme.shape.borderRadius}px`,
              }}
            />
            <Bar dataKey="contributions" stackId="a" fill={theme.palette.success.main} name="Contributions" />
            <Bar dataKey="interests" stackId="a" fill={theme.palette.primary.main} name="Interests" />
          </BarChart>
        </ResponsiveContainer>
      </Stack>
    </Card>
  )
}
