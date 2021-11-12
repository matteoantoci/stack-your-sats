import Big from 'big.js'

export type Currency = {
  readonly value: string
  readonly label: string
}
export const CURRENCIES = [
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

export const formatCurrency = (value: Big, currency: string) =>
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    currencyDisplay: 'narrowSymbol',
  }).format(value.toNumber())
