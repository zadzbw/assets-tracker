import { useMemo } from 'react'
import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

const COLORS = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
]

export const TrendChart = () => {
  const { date, total, asset } = useChartAsset()

  const options = useMemo<ECOption>(
    () => ({
      color: COLORS,
      title: {
        text: '趋势变化',
        left: 'center',
        textStyle: { fontSize: 14, fontWeight: 500 },
      },
      tooltip: {
        trigger: 'axis',
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
        data: date,
        boundaryGap: false,
        axisTick: { alignWithLabel: true },
        axisLabel: { fontSize: 10 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 10 },
        splitLine: { lineStyle: { type: 'dashed', opacity: 0.4 } },
      },
      series: [
        ...asset.map((item) => ({
          type: 'line' as const,
          name: item.name,
          data: item.value,
          smooth: true,
          symbolSize: 6,
          lineStyle: { width: 2 },
        })),
        {
          type: 'line' as const,
          name: '总计',
          data: total,
          smooth: true,
          symbolSize: 8,
          lineStyle: { width: 3, type: 'dashed' as const },
          areaStyle: { opacity: 0.05 },
        },
      ],
    }),
    [date, total, asset],
  )

  return <ChartCore options={options} />
}
