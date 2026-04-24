import { useMemo } from 'react'
import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

const COLORS = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
]

export const AllocationAreaChart = () => {
  const { date, total, asset } = useChartAsset()

  const options = useMemo<ECOption>(() => {
    const pctData = asset.map((item) => ({
      name: item.name,
      values: item.value.map((v, i) => (total[i] > 0 ? +((v / total[i]) * 100).toFixed(2) : 0)),
    }))

    return {
      color: COLORS,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const items = params as Array<{
            seriesName: string
            value: number
            marker: string
            dataIndex: number
          }>
          const idx = items[0]?.dataIndex ?? 0
          let html = `<div style="font-weight:600;margin-bottom:6px">${date[idx]}</div>`
          for (const item of items) {
            if (item.value === 0) continue
            const a = asset.find((a) => a.name === item.seriesName)
            const absVal = a ? a.value[idx] : 0
            html += '<div style="display:flex;align-items:center;gap:6px;margin:2px 0">'
            html += `<span>${item.marker}</span>`
            html += `<span style="flex:1">${item.seriesName}</span>`
            html += `<span style="font-weight:600;min-width:48px;text-align:right">${item.value.toFixed(1)}%</span>`
            html += `<span style="color:#888;min-width:56px;text-align:right">${absVal.toLocaleString()}</span>`
            html += '</div>'
          }
          return html
        },
      },
      grid: {
        left: 48,
        right: 24,
        top: 12,
        bottom: 24,
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
        max: 100,
        axisLabel: {
          fontSize: 12,
          formatter: (v: number) => `${v}%`,
        },
        splitLine: { lineStyle: { type: 'dashed', opacity: 0.4 } },
      },
      series: pctData.map((item, i) => ({
        type: 'bar' as const,
        name: item.name,
        data: item.values,
        stack: 'pct',
        barMaxWidth: 56,
        itemStyle: {
          borderRadius: i === pctData.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0],
        },
        emphasis: { focus: 'series' as const },
        label: {
          show: true,
          position: 'inside' as const,
          fontSize: 12,
          color: '#fff',
          textBorderColor: 'rgba(0,0,0,0.4)',
          textBorderWidth: 2,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter: (p: any) => {
            const v = p.data as number
            return v < 5 ? '' : `${v.toFixed(1)}%`
          },
        },
      })),
    }
  }, [date, total, asset])

  return <ChartCore options={options} />
}
