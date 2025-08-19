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
    TransformComponent, // 内置数据转换器组件 (filter, sort)
  } = await import('echarts/components')
  const { LabelLayout, UniversalTransition } = await import('echarts/features')
  const { CanvasRenderer } = await import('echarts/renderers')

  echarts.use([
    BarChart,
    LineChart,

    TitleComponent,
    TooltipComponent,
    GridComponent,

    DatasetComponent,
    TransformComponent,

    LabelLayout,
    UniversalTransition,

    CanvasRenderer,
  ])

  return echarts
}
