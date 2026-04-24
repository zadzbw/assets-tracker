import { useMemo } from 'react'
import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

const COLORS = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
]

const fmtNum = (v: number) =>
  v.toLocaleString(undefined, { maximumFractionDigits: 2 })

export const ComboChart = () => {
  const { date, total, asset } = useChartAsset()

  const options = useMemo<ECOption>(() => {
    return {
      color: COLORS,
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        formatter: (params: any) => {
          const items = params as Array<{
            seriesName: string
            seriesType: string
            value: number
            marker: string
            dataIndex: number
          }>

          const idx = items[0]?.dataIndex ?? 0
          const prevIdx = idx - 1
          const curTotal = total[idx] ?? 0
          const prevTotal = prevIdx >= 0 ? total[prevIdx] ?? 0 : 0
          const totalDiff = curTotal - prevTotal
          const totalDiffPct = prevTotal > 0 ? ((totalDiff / prevTotal) * 100).toFixed(1) : '-'

          let html = `<div style="font-weight:600;margin-bottom:8px;font-size:13px">${date[idx]}</div>`

          for (const item of items) {
            if (item.seriesName === '总资产') continue
            if (item.value === 0) continue

            const pct = curTotal > 0 ? ((item.value / curTotal) * 100).toFixed(1) : '0'
            const a = asset.find((a) => a.name === item.seriesName)
            const prevVal = a && prevIdx >= 0 ? a.value[prevIdx] ?? 0 : 0
            const diff = item.value - prevVal
            const diffSign = diff >= 0 ? '+' : ''
            const diffColor = diff > 0 ? '#22c55e' : diff < 0 ? '#ef4444' : '#888'
            const diffPct = prevVal > 0 ? `${diffSign}${((diff / prevVal) * 100).toFixed(1)}%` : ''

            html += '<div style="display:flex;align-items:center;gap:6px;margin:3px 0">'
            html += `<span>${item.marker}</span>`
            html += `<span style="flex:1">${item.seriesName}</span>`
            html += `<span style="font-weight:600;min-width:60px;text-align:right">${fmtNum(item.value)}</span>`
            html += `<span style="color:#888;min-width:42px;text-align:right">${pct}%</span>`
            html += `<span style="color:${diffColor};min-width:56px;text-align:right;font-size:11px">${diffPct}</span>`
            html += '</div>'
          }

          const tSign = totalDiff >= 0 ? '+' : ''
          const tColor = totalDiff > 0 ? '#22c55e' : totalDiff < 0 ? '#ef4444' : '#888'
          html += '<div style="border-top:1px solid #ddd;margin-top:6px;padding-top:6px;display:flex;align-items:center;gap:6px">'
          html += '<span style="flex:1;font-weight:600">总资产</span>'
          html += `<span style="font-weight:700;min-width:60px;text-align:right">${fmtNum(curTotal)}</span>`
          html += '<span style="min-width:42px;text-align:right">100%</span>'
          html += `<span style="color:${tColor};min-width:56px;text-align:right;font-size:11px">${tSign}${totalDiffPct}%</span>`
          html += '</div>'

          return html
        },
      },
      legend: {
        type: 'scroll',
        bottom: 0,
        itemGap: 16,
        textStyle: { fontSize: 14 },
      },
      grid: {
        left: 60,
        right: 60,
        top: 24,
        bottom: 48,
        containLabel: false,
      },
      xAxis: {
        type: 'category',
        data: date,
        axisTick: { alignWithLabel: true },
        axisLabel: { fontSize: 14 },
      },
      yAxis: [
        {
          type: 'value',
          name: 'CNY',
          axisLabel: { fontSize: 14 },
          splitLine: { lineStyle: { type: 'dashed', opacity: 0.4 } },
        },
      ],
      series: [
        ...asset.map((item, i) => ({
          type: 'bar' as const,
          name: item.name,
          data: item.value,
          stack: 'total',
          barMaxWidth: 56,
          itemStyle: {
            borderRadius: i === asset.length - 1 ? [2, 2, 0, 0] : [0, 0, 0, 0],
          },
          emphasis: { focus: 'series' as const },
          label: { show: false },
        })),
        {
          type: 'line' as const,
          name: '总资产',
          data: total,
          smooth: false,
          symbolSize: 8,
          lineStyle: { width: 3, color: '#333' },
          itemStyle: { color: '#333' },
          label: {
            show: true,
            position: 'top' as const,
            fontSize: 14,
            fontWeight: 'bold' as const,
            color: '#333',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (p: any) => fmtNum(p.data as number),
          },
          z: 10,
        },
      ],
    }
  }, [date, total, asset])

  return <ChartCore options={options} />
}
