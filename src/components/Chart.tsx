import { FC } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { theme } from '../theme'
import { Paper, Stack, styled, Typography } from '@mui/material'

const FONT_SIZE = theme.typography.fontSize

export const getIntSpacing = (spacing: number): number => parseInt(theme.spacing(spacing), 10)

type ChartData = {
  year: string
  interests: number
  contributions: number
  total: number
}

const chartData: ChartData[] = [
  { year: '2021', interests: 0, contributions: 10000, total: 10000 },
  { year: '2022', interests: 1000, contributions: 20000, total: 21000 },
  { year: '2023', interests: 3000, contributions: 30000, total: 33000 },
]

export const createCurrencyFormatter = (currency: string) => (value: number) =>
  new Intl.NumberFormat(navigator.language, {
    style: 'currency',
    currency,
  }).format(value)

const Card = styled(Paper)`
  padding: ${theme.spacing(3)};
  height: 100%;
`

export const Chart: FC = () => (
  <Card>
    <Stack spacing={3}>
      <Typography variant={'h2'}>Stack your sats!</Typography>
      <ResponsiveContainer height={getIntSpacing(50)}>
        <BarChart data={chartData}>
          <CartesianGrid opacity={0.3} />
          <XAxis dataKey="year" tick={{ fontSize: FONT_SIZE }} />
          <YAxis tick={{ fontSize: FONT_SIZE }} />
          <Tooltip
            formatter={createCurrencyFormatter('EUR')}
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
