import { memo, useEffect, useRef } from 'react'
import { createECharts, type ECOption } from '@/utils/createECharts.ts'

type ChartCoreProps = {
  options: ECOption
}

export const ChartCore = memo(({ options }: ChartCoreProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<ReturnType<typeof import('echarts/core').init> | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let disposed = false

    const init = async () => {
      const echarts = await createECharts()
      if (disposed) return

      let chartInstance = echarts.getInstanceByDom(el)
      if (!chartInstance) {
        chartInstance = echarts.init(el)
      }

      instanceRef.current = chartInstance
      chartInstance.setOption<ECOption>(options, true)
    }

    init()

    return () => {
      disposed = true
    }
  }, [options])

  // ResizeObserver + dispose cleanup
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      instanceRef.current?.resize()
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (instanceRef.current) {
        instanceRef.current.dispose()
        instanceRef.current = null
      }
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full" />
})

ChartCore.displayName = 'ChartCore'
