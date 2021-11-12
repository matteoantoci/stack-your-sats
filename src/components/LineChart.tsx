import React, { FC } from 'react'
import { CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { theme } from '../theme'
import { List, ListItem, ListItemText, ListSubheader, Paper } from '@mui/material'
import { amber, cyan, green } from '@mui/material/colors'
import { formatCurrency } from '../currencies'
import { ChartData, formatWithSuffix, getIntSpacing, GOLD_RATE, S_AND_P_RATE, TESLA_RATE } from '../chartUtils'

const FONT_SIZE = theme.typography.fontSize

const createCustomTooltip =
  (currency: string): FC<TooltipProps<any, string>> =>
  ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const { year } = payload[0].payload as ChartData
    return (
      <Paper variant="outlined">
        <List dense={true} subheader={<ListSubheader component="div">Year: {year}</ListSubheader>}>
          {payload.map((it) => (
            <ListItem key={it.name}>
              <ListItemText
                primary={it.name}
                secondary={formatCurrency(it.value, currency)}
                primaryTypographyProps={{ color: it.color }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }

type Props = {
  data: ChartData[]
  currency: string
  btcRate: number
}

export const LineChart: FC<Props> = ({ data, currency, btcRate }) => {
  const max = data[data.length - 1].bitcoin
  return (
    <ResponsiveContainer height={getIntSpacing(50)}>
      <ComposedChart data={data}>
        <CartesianGrid opacity={0.3} />
        <XAxis dataKey="year" tick={{ fontSize: FONT_SIZE }} />
        <YAxis
          domain={[0, max.mul(1.1).toNumber()]}
          orientation="left"
          tickFormatter={formatWithSuffix}
          tick={{ fontSize: FONT_SIZE }}
        />
        <Tooltip content={createCustomTooltip(currency)} />
        <Line type="monotone" dataKey="gold" strokeWidth={2} name={`Gold (${GOLD_RATE}% CAGR)`} stroke={amber[500]} />
        <Line
          type="monotone"
          dataKey="sAndP"
          strokeWidth={2}
          name={`S&P 500 (${S_AND_P_RATE}% CAGR)`}
          stroke={green[500]}
        />
        <Line type="monotone" dataKey="tesla" strokeWidth={2} name={`Tesla (${TESLA_RATE}% CAGR)`} stroke={cyan[500]} />
        <Line
          dataKey="bitcoin"
          type="monotone"
          strokeWidth={4}
          name={`Bitcoin (${btcRate}%)`}
          stroke={theme.palette.primary.main}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
