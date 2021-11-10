import { CURRENCIES, Currency } from './currencies'
import { useState } from 'react'

export type Store = {
  currency: Currency
  onCurrencyChange: (value: Currency) => void
  startingAmount: number
  onStartingAmountChange: (value: number) => void
  monthlyContribution: number
  onMonthlyContributionChange: (value: number) => void
  rate: number
  onRateChange: (value: number) => void
  yearsToGrow: number
  onYearsToGrowChange: (value: number) => void
}

export const useStore = (): Store => {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0])
  const [yearsToGrow, setYearsToGrow] = useState(5)
  const [startingAmount, setStartingAmount] = useState(1000)
  const [monthlyContribution, setMonthlyContribution] = useState(100)
  const [rate, setRate] = useState(162)

  return {
    currency,
    yearsToGrow,
    startingAmount,
    monthlyContribution,
    rate,
    onCurrencyChange: setCurrency,
    onMonthlyContributionChange: setMonthlyContribution,
    onRateChange: setRate,
    onStartingAmountChange: setStartingAmount,
    onYearsToGrowChange: setYearsToGrow,
  }
}
