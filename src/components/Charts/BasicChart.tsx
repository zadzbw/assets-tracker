import { useMemo } from 'react'
import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

const COLORS = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
]

export const BasicChart = () => {
  const { date, asset } = useChartAsset()

  const options = useMemo<ECOption>(
    () => ({
      color: COLORS,
      title: {
        text: '资产绝对值',
        left: 'center',
        textStyle: { fontSize: 14, fontWeight: 500 },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const items = params as Array<{
            seriesName: string
            value: number
            marker: string
          }>
          const dateLabel = items[0]?.axisValue ?? ''
          let html = `<div style="font-weight:600;margin-bottom:6px">${dateLabel}</div>`
          let sum = 0
          for (const item of items) {
            if (item.value === 0) continue
            sum += item.value
            html += '<div style="display:flex;justify-content:space-between;gap:16px">'
            html += `<span>${item.marker} ${item.seriesName}</span>`
            html += `<span style="font-weight:600">${item.value.toLocaleString()}</span>`
            html += '</div>'
          }
          html += '<div style="border-top:1px solid #ccc;margin-top:4px;padding-top:4px;display:flex;justify-content:space-between;gap:16px">'
          html += `<span>Total</span><span style="font-weight:600">${sum.toLocaleString()}</span></div>`
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
        left: 60,
        right: 24,
        top: 36,
        bottom: 36,
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: date,
        axisTick: { alignWithLabel: true },
        axisLabel: { fontSize: 12 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 12 },
        splitLine: { lineStyle: { type: 'dashed', opacity: 0.4 } },
      },
      series: [
        ...asset.map((item, i) => ({
          type: 'bar' as const,
          name: item.name,
          data: item.value,
          stack: 'total',
          barMaxWidth: 48,
          itemStyle: { borderRadius: i === asset.length - 1 ? [2, 2, 0, 0] : 0 },
          emphasis: { focus: 'series' as const },
          label: { show: false },
        })),
      ],
    }),
    [date, asset],
  )

  return <ChartCore options={options} />
}
