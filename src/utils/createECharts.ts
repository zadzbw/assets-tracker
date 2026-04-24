import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption, LineSeriesOption, PieSeriesOption } from 'echarts/charts'
import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
} from 'echarts/components'

export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
>

let echarts: typeof import('echarts/core') | undefined

export const createECharts = async () => {
  if (echarts) {
    return echarts
  }
  echarts = await import('echarts/core')
  const { BarChart, LineChart, PieChart } = await import('echarts/charts')
  const {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    ToolboxComponent,
  } = await import('echarts/components')
  const { CanvasRenderer } = await import('echarts/renderers')

  echarts.use([
    // charts
    BarChart,
    LineChart,
    PieChart,

    // chart components
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    ToolboxComponent,

    // render
    CanvasRenderer,
  ])

  return echarts
}
