import { ComboChart } from '@/components/Charts/ComboChart.tsx'
import { AllocationAreaChart } from '@/components/Charts/AllocationAreaChart.tsx'
import { useGroupAsset, useSetGroupAsset, useAssetRecordList } from '@/models/asset.ts'

export const ChartPage = () => {
  const groupAsset = useGroupAsset()
  const setGroupAsset = useSetGroupAsset()
  const records = useAssetRecordList()

  if (records.length === 0) {
    return (
      <div className="bg-base-200 rounded-box p-6 text-center">
        <p className="text-base-content/60">暂无数据，请先创建资产记录</p>
      </div>
    )
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col gap-2">
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

      <div className="min-h-0 flex-[3]">
        <ComboChart />
      </div>

      <div className="min-h-0 flex-[2]">
        <AllocationAreaChart />
      </div>
    </div>
  )
}
