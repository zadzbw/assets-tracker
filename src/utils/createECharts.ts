import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components'

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

let echarts: typeof import('echarts/core') | undefined

export const createECharts = async () => {
  if (echarts) {
    return echarts
  }
  echarts = await import('echarts/core')
  const { BarChart, LineChart } = await import('echarts/charts')
  const {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent, // 数据集组件
  } = await import('echarts/components')
  // const { LabelLayout, UniversalTransition } = await import('echarts/features')
  const { CanvasRenderer } = await import('echarts/renderers')

  echarts.use([
    // charts
    BarChart,
    LineChart,

    // chart components
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,

    // render
    CanvasRenderer,
  ])

  return echarts
}
