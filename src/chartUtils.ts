import Big from 'big.js'
import { theme } from './theme'
import numeral from 'numeral'

export type ChartUtils = {
  year: string
  contributions: Big
  bitcoinGrowth: Big
  bitcoin: Big
  gold: Big
  sAndP: Big
  tesla: Big
}

export type ChartData = {
  year: string
  contributions: Big
  bitcoinGrowth: Big
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

const toRate = (rate: number) => new Big(rate).div(100).plus(1)

export const GOLD_RATE = 1.97
export const S_AND_P_RATE = 11.22
export const TESLA_RATE = 63.8

export const createChartData = (args: ChartArgs) => {
  const currentYear = new Date().getFullYear()
  const startingAmount = new Big(args.startingAmount)
  const yearlyContribution = new Big(args.monthlyContribution).mul(12)
  const monthlyRate = toRate(args.rate)

  const chartData: ChartUtils[] = Array(args.yearsToGrow)
    .fill(undefined)
    .reduce((chartDataAcc: ChartUtils[], _, year): ChartUtils[] => {
      const prev = chartDataAcc[year - 1]
      const prevTotal = prev ? prev.bitcoin : startingAmount
      const prevGold = prev ? prev.gold : startingAmount
      const prevSAndP = prev ? prev.sAndP : startingAmount
      const prevTesla = prev ? prev.tesla : startingAmount
      const contributions = startingAmount.plus(yearlyContribution.mul(year + 1))
      const bitcoin = prevTotal.mul(monthlyRate).plus(yearlyContribution).round()
      return [
        ...chartDataAcc,
        {
          year: (currentYear + year).toString(),
          contributions,
          bitcoin,
          bitcoinGrowth: bitcoin.minus(contributions),
          gold: prevGold.mul(toRate(GOLD_RATE)).plus(yearlyContribution).round(),
          sAndP: prevSAndP.mul(toRate(S_AND_P_RATE)).plus(yearlyContribution).round(),
          tesla: prevTesla.mul(toRate(TESLA_RATE)).plus(yearlyContribution).round(),
        },
      ]
    }, [] as ChartUtils[])

  chartData.unshift({
    year: 'Start',
    bitcoinGrowth: Big(0),
    contributions: startingAmount,
    bitcoin: startingAmount,
    gold: startingAmount,
    sAndP: startingAmount,
    tesla: startingAmount,
  })

  return chartData
}

export const getIntSpacing = (spacing: number): number => parseInt(theme.spacing(spacing), 10)

export const formatWithSuffix = (value: number) => {
  const formatted = numeral(value).format(`(0a)`)
  return value > 1000000 ? formatted.toUpperCase() : formatted
}
