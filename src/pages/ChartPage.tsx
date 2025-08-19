import { BasicChart } from '@/components/Charts/BasicChart.tsx'
import { NormalizationChart } from '@/components/Charts/NormalizationChart.tsx'
import { useGroupAsset, useSetGroupAsset } from '@/models/asset.ts'

export const ChartPage = () => {
  const groupAsset = useGroupAsset()
  const setGroupAsset = useSetGroupAsset()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <label htmlFor="group-asset">按大类资产聚合:</label>
        <input
          id="group-asset"
          type="checkbox"
          checked={groupAsset}
          aria-checked={groupAsset}
          className="toggle toggle-primary"
          onChange={(e) => {
            setGroupAsset(e.target.checked)
          }}
        />
      </div>
      <div className="h-[480px] w-[640px]">
        <BasicChart />
      </div>
      <div className="h-[480px] w-[640px]">
        <NormalizationChart />
      </div>
    </div>
  )
}
