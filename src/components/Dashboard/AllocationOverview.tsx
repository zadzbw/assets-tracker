import { PieChart } from '@/components/Charts/PieChart.tsx'
import {
  useAllocationByCategory,
  useAllocationByRisk,
  useAllocationByCurrency,
} from '@/models/portfolio.ts'

export const AllocationOverview = () => {
  const byCategory = useAllocationByCategory()
  const byRisk = useAllocationByRisk()
  const byCurrency = useAllocationByCurrency()

  if (byCategory.length === 0) return null

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="bg-base-200 rounded-box aspect-square p-2">
        <PieChart
          title="资产类别"
          data={byCategory.map((item) => ({ name: item.label, value: item.value }))}
        />
      </div>
      <div className="bg-base-200 rounded-box aspect-square p-2">
        <PieChart
          title="风险分布"
          data={byRisk.map((item) => ({ name: item.label, value: item.value }))}
        />
      </div>
      <div className="bg-base-200 rounded-box aspect-square p-2">
        <PieChart
          title="币种曝露"
          data={byCurrency.map((item) => ({ name: item.label, value: item.value }))}
        />
      </div>
    </div>
  )
}
