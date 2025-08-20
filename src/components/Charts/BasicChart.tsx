import { useChartAsset } from '@/models/asset.ts'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

export const BasicChart = () => {
  const { date, total, asset } = useChartAsset()

  const options: ECOption = {
    xAxis: {
      type: 'category',
      data: date,
    },
    yAxis: [
      {
        type: 'value',
        name: 'Total',
        alignTicks: true,
        axisLine: {
          show: true,
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      axisPointer: {
        type: 'shadow',
      },
    },
    series: [
      ...asset.map((item) => {
        return {
          type: 'bar' as const,
          name: item.name,
          data: item.value,
          emphasis: {
            focus: 'series' as const,
          },
          label: {
            show: true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            formatter: (params: any) => {
              const data = params.data as number
              if (data === 0) {
                return ''
              }
              return `${params.seriesName} - ${data}`
            },
          },
          stack: 'Total',
        }
      }),
      {
        type: 'bar',
        name: 'Total',
        data: total,
        barWidth: 16,
        label: {
          show: true,
          position: 'top',
          formatter: 'Total: {c}',
        },
      },
    ],
  }

  return <ChartCore options={options} />
}
