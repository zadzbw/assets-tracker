import { memo, useEffect, useId } from 'react'
import { createECharts, type ECOption } from '@/utils/createECharts.ts'

type ChartCoreProps = {
  options: ECOption
}

export const ChartCore = memo(({ options }: ChartCoreProps) => {
  const id = useId()
  const elementId = `chart-${id}`

  useEffect(() => {
    const init = async () => {
      const echarts = await createECharts()
      const el = document.getElementById(elementId)!
      let chartInstance = echarts.getInstanceByDom(el)

      if (!chartInstance) {
        // 如果不存在，创建新实例
        chartInstance = echarts.init(el)
      }

      chartInstance.setOption<ECOption>(options, true)
    }

    init()
  }, [elementId, options])

  return <div id={elementId} className="h-full w-full" />
})

ChartCore.displayName = 'ChartCore'
