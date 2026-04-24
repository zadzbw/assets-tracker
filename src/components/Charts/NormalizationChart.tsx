import { useMemo } from 'react'
import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

const COLORS = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
]

export const NormalizationChart = () => {
  const { date, total, asset } = useChartAsset()

  const options = useMemo<ECOption>(
    () => ({
      color: COLORS,
      title: {
        text: '资产占比',
        left: 'center',
        textStyle: { fontSize: 14, fontWeight: 500 },
      },
      dataset: {
        source: [
          ['date', ...date],
          ...asset.map((item) => [
            item.name,
            ...item.value.map((value, index) => value / total[index]),
          ]),
        ],
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const items = params as Array<{
            seriesName: string
            data: number[]
            seriesIndex: number
            marker: string
            axisValue: string
          }>
          const dateLabel = items[0]?.axisValue ?? ''
          const dateIndex = date.indexOf(dateLabel)
          let html = `<div style="font-weight:600;margin-bottom:6px">${dateLabel}</div>`
          for (const item of items) {
            const ratio = item.data[item.seriesIndex + 1]
            if (ratio === 0) continue
            const pct = (Math.round(ratio * 10000) / 100).toFixed(1)
            const absVal = dateIndex >= 0 ? asset[item.seriesIndex]?.value[dateIndex] : undefined
            const absStr = absVal !== undefined ? ` (${absVal.toLocaleString()})` : ''
            html += '<div style="display:flex;justify-content:space-between;gap:12px">'
            html += `<span>${item.marker} ${item.seriesName}</span>`
            html += `<span style="font-weight:600">${pct}%${absStr}</span>`
            html += '</div>'
          }
          return html
        },
      },
      legend: {
        type: 'scroll',
        bottom: 0,
        itemGap: 16,
        textStyle: { fontSize: 12 },
      },
      grid: {
        left: 48,
        right: 12,
        top: 36,
        bottom: 36,
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        axisTick: { alignWithLabel: true },
        axisLabel: { fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          formatter: (value: number) => `${Math.round(value * 100)}%`,
        },
        max: 1,
        splitLine: { lineStyle: { type: 'dashed', opacity: 0.4 } },
      },
      series: asset.map((_, i) => ({
        type: 'bar' as const,
        seriesLayoutBy: 'row' as const,
        stack: 'total',
        barMaxWidth: 48,
        itemStyle: { borderRadius: i === asset.length - 1 ? [2, 2, 0, 0] : 0 },
        emphasis: { focus: 'series' as const },
        label: { show: false },
      })),
    }),
    [date, total, asset],
  )

  return <ChartCore options={options} />
}
