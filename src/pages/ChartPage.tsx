import { BasicChart } from '@/components/Charts/BasicChart.tsx'
import { NormalizationChart } from '@/components/Charts/NormalizationChart.tsx'
import { TrendChart } from '@/components/Charts/TrendChart.tsx'
import { useGroupAsset, useSetGroupAsset } from '@/models/asset.ts'

export const ChartPage = () => {
  const groupAsset = useGroupAsset()
  const setGroupAsset = useSetGroupAsset()

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-3">
      <div className="flex items-center gap-4">
        <label className="flex cursor-pointer items-center gap-x-2">
          <span className="text-sm">按大类聚合</span>
          <input
            type="checkbox"
            checked={groupAsset}
            aria-checked={groupAsset}
            className="toggle toggle-primary toggle-sm"
            onChange={(e) => setGroupAsset(e.target.checked)}
          />
        </label>
      </div>

      <div className="min-h-0 flex-1">
        <BasicChart />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3">
        <div className="min-h-0">
          <NormalizationChart />
        </div>
        <div className="min-h-0">
          <TrendChart />
        </div>
      </div>
    </div>
  )
}
