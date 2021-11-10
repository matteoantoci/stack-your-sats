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
