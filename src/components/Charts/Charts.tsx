import { useEffect, useId } from 'react'
import { echarts, type ECOption } from '@/utils/echarts.ts'
import type { AssetItem } from '@/types/asset.ts'

const list: AssetItem[] = []

console.log(list)

export const Charts = () => {
  const id = useId()
  const elementId = `chart-${id}`

  useEffect(() => {
    const chartInstance = echarts.init(document.getElementById(elementId))
    chartInstance.setOption<ECOption>({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar',
        },
      ],
    })
  }, [elementId])

  return <div id={elementId} className="h-full w-full" />
}
