import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

export const NormalizationChart = () => {
  const { date, total, asset } = useChartAsset()

  const options: ECOption = {
    dataset: {
      source: [
        ['date', ...date],
        ...asset.map((item) => [
          item.name,
          ...item.value.map((value, index) => value / total[index]),
        ]),
      ],
    },
    xAxis: {
      type: 'category',
    },
    yAxis: [
      {
        type: 'value',
      },
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      valueFormatter: (value) => {
        return `${Math.round((value as number) * 10000) / 100 + '%'}`
      },
    },
    series: asset.map(() => {
      return {
        type: 'bar',
        seriesLayoutBy: 'row',
        stack: 'total',
        label: {
          show: true,
          formatter: (params) => {
            const data = params.data as number[]
            const v = data[(params.seriesIndex as number) + 1]
            if (v === 0) {
              return ''
            }
            return `${params.seriesName} - ${Math.round(v * 10000) / 100 + '%'}`
          },
        },
      }
    }),
  }

  return <ChartCore options={options} />
}
