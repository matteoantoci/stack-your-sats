import React, { FC } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { theme } from '../theme'
import Big from 'big.js'
import numeral from 'numeral'
import { Store } from '../store'

type ChartData = {
  year: string
  growth: Big
  contributions: Big
  total: Big
}

type ChartArgs = {
  yearsToGrow: number
  startingAmount: number
  monthlyContribution: number
  rate: number
}

const FONT_SIZE = theme.typography.fontSize

export const getIntSpacing = (spacing: number): number => parseInt(theme.spacing(spacing), 10)

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
          growth: total.minus(contributions),
          total,
        },
      ]
    }, [] as ChartData[])

  chartData.unshift({
    year: 'Start',
    contributions: startingAmount,
    growth: Big(0),
    total: startingAmount,
  })

  return chartData
}

const formatAxisValue = (value: number) => {
  const formatted = numeral(value).format(`(0a)`)
  return value > 1000000 ? formatted.toUpperCase() : formatted
}

type Props = {
  store: Store
}

export const Chart: FC<Props> = ({ store }) => {
  const data = createChartData(store)
  return (
    <ResponsiveContainer height={getIntSpacing(60)}>
      <BarChart data={data}>
        <CartesianGrid opacity={0.3} />
        <XAxis dataKey="year" tick={{ fontSize: FONT_SIZE }} />
        <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: FONT_SIZE }} />
        <Tooltip
          formatter={(value: number) =>
            new Intl.NumberFormat(navigator.language, {
              style: 'currency',
              currency: store.currency.value,
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
        <Bar dataKey="growth" stackId="a" fill={theme.palette.primary.main} name="Growth" />
      </BarChart>
    </ResponsiveContainer>
  )
}
