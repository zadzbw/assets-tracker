import { useMemo } from 'react'
import { type ECOption } from '@/utils/createECharts.ts'
import { ChartCore } from './ChartCore.tsx'

type PieChartProps = {
  data: Array<{ name: string; value: number }>
  title: string
  isDonut?: boolean
}

const COLORS = [
  '#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de',
  '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc',
]

export const PieChart = ({ data, title, isDonut = true }: PieChartProps) => {
  const options = useMemo<ECOption>(
    () => ({
      color: COLORS,
      title: {
        text: title,
        left: 'center',
        textStyle: { fontSize: 15, fontWeight: 500 },
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        type: 'scroll',
        orient: 'horizontal',
        bottom: 0,
        itemGap: 12,
        textStyle: { fontSize: 12 },
      },
      series: [
        {
          type: 'pie',
          radius: isDonut ? ['30%', '68%'] : '68%',
          center: ['50%', '48%'],
          data,
          padAngle: 2,
          itemStyle: { borderRadius: 4 },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}: {c}\n({d}%)',
            fontSize: 13,
            fontWeight: 500,
            color: '#fff',
            textBorderColor: 'rgba(0,0,0,0.6)',
            textBorderWidth: 2,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            minShowLabelAngle: 25 as any,
          },
          labelLine: { show: false },
        },
      ],
    }),
    [data, title, isDonut],
  )

  return <ChartCore options={options} />
}
