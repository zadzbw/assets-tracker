import * as echarts from 'echarts/core'
import type { ComposeOption } from 'echarts/core'

import { BarChart, LineChart, type BarSeriesOption, type LineSeriesOption } from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
  type TitleComponentOption,
  type TooltipComponentOption,
  type GridComponentOption,
  type DatasetComponentOption,
} from 'echarts/components'

import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,

  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
])

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

export { echarts }
