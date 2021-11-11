import React, { FC } from 'react'
import { Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { theme } from '../theme'
import Big from 'big.js'
import numeral from 'numeral'
import { Store } from '../store'
import { List, ListItem, ListItemText, ListSubheader, Paper } from '@mui/material'
import { amber, cyan, teal } from '@mui/material/colors'

type ChartData = {
  year: string
  bitcoin: Big
  gold: Big
  sAndP: Big
  tesla: Big
}

type ChartArgs = {
  yearsToGrow: number
  startingAmount: number
  monthlyContribution: number
  rate: number
}

const FONT_SIZE = theme.typography.fontSize

export const getIntSpacing = (spacing: number): number => parseInt(theme.spacing(spacing), 10)

const toRate = (rate: number) => new Big(rate).div(100).plus(1)

const GOLD_RATE = 1.97
const S_AND_P_RATE = 11.22
const TESLA_RATE = 63.8

const createChartData = (args: ChartArgs) => {
  const currentYear = new Date().getFullYear()
  const startingAmount = new Big(args.startingAmount)
  const yearlyContribution = new Big(args.monthlyContribution).mul(12)
  const monthlyRate = toRate(args.rate)

  const chartData: ChartData[] = Array(args.yearsToGrow)
    .fill(undefined)
    .reduce((chartDataAcc: ChartData[], _, year): ChartData[] => {
      const prev = chartDataAcc[year - 1]
      const prevTotal = prev ? prev.bitcoin : startingAmount
      const prevGold = prev ? prev.gold : startingAmount
      const prevSAndP = prev ? prev.sAndP : startingAmount
      const prevTesla = prev ? prev.tesla : startingAmount
      // const contributions = startingAmount.plus(yearlyContribution.mul(year + 1))
      return [
        ...chartDataAcc,
        {
          year: (currentYear + year).toString(),
          // contributions,
          // bitcoinGrowth: prevTotal.mul(monthlyRate).plus(yearlyContribution).round().minus(contributions),
          bitcoin: prevTotal.mul(monthlyRate).plus(yearlyContribution).round(),
          gold: prevGold.mul(toRate(GOLD_RATE)).plus(yearlyContribution).round(),
          sAndP: prevSAndP.mul(toRate(S_AND_P_RATE)).plus(yearlyContribution).round(),
          tesla: prevTesla.mul(toRate(TESLA_RATE)).plus(yearlyContribution).round(),
        },
      ]
    }, [] as ChartData[])

  chartData.unshift({
    year: 'Start',
    bitcoin: startingAmount,
    gold: startingAmount,
    sAndP: startingAmount,
    tesla: startingAmount,
  })

  return chartData
}

const formatAxisValue = (value: number) => {
  const formatted = numeral(value).format(`(0a)`)
  return value > 1000000 ? formatted.toUpperCase() : formatted
}

const formatCurrency = (value: Big, currency: string) =>
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol',
  }).format(value.toNumber())

const createCustomTooltip =
  (currency: string): FC<TooltipProps<any, string>> =>
  ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const { year, bitcoin } = payload[0].payload as ChartData
    return (
      <Paper variant="outlined">
        <List dense={true} subheader={<ListSubheader component="div">Year: {year}</ListSubheader>}>
          {payload.map((it) => (
            <ListItem key={it.name}>
              <ListItemText
                primary={`${it.name}: ${formatCurrency(it.value, currency)}`}
                primaryTypographyProps={{ color: it.color }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }

type Props = {
  store: Store
}

export const Chart: FC<Props> = ({ store }) => {
  const data = createChartData(store)
  const max = data[data.length - 1].bitcoin
  return (
    <ResponsiveContainer height={getIntSpacing(60)}>
      <ComposedChart data={data}>
        <CartesianGrid opacity={0.3} />
        <XAxis dataKey="year" tick={{ fontSize: FONT_SIZE }} />
        <YAxis
          domain={[0, max.mul(1.1).toNumber()]}
          orientation="left"
          tickFormatter={formatAxisValue}
          tick={{ fontSize: FONT_SIZE }}
        />
        <Tooltip content={createCustomTooltip(store.currency.value)} />
        <Bar type="monotone" dataKey="gold" strokeWidth={2} name={`Gold - ${GOLD_RATE}% CAGR`} fill={amber[500]} />
        <Bar
          type="monotone"
          dataKey="sAndP"
          strokeWidth={2}
          name={`S&P 500 - ${S_AND_P_RATE}% CAGR`}
          fill={teal[500]}
        />
        <Bar type="monotone" dataKey="tesla" strokeWidth={2} name={`Tesla - ${TESLA_RATE}% CAGR`} fill={cyan[500]} />
        <Bar
          dataKey="bitcoin"
          strokeWidth={4}
          name={`Bitcoin - ${store.rate}% CAGR`}
          fill={theme.palette.primary.main}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
