import React, { FC } from 'react'
import { Bar, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from 'recharts'
import { theme } from '../theme'
import { List, ListItem, ListItemText, ListSubheader, Paper } from '@mui/material'
import { ChartUtils, formatWithSuffix, getIntSpacing } from '../chartUtils'
import { formatCurrency } from '../currencies'
import { green } from '@mui/material/colors'

const FONT_SIZE = theme.typography.fontSize

const createCustomTooltip =
  (currency: string): FC<TooltipProps<any, string>> =>
  ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const { year, bitcoin } = payload[0].payload as ChartUtils
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
          <ListItem>
            <ListItemText primary="Total" secondary={formatCurrency(bitcoin, currency)} />
          </ListItem>
        </List>
      </Paper>
    )
  }

type Props = {
  data: ChartUtils[]
  currency: string
}

export const BarChart: FC<Props> = ({ data, currency }) => {
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
        <Bar dataKey="contributions" stackId="a" fill={green[500]} name="Contributions" />
        <Bar dataKey="bitcoinGrowth" stackId="a" fill={theme.palette.primary.main} name="Bitcoin growth" />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
