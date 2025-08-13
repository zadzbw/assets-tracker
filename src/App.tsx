import { useGroupAsset, useSetGroupAsset } from '@/models/asset.ts'
import { BasicChart } from '@/components/Charts/BasicChart.tsx'
import { NormalizationChart } from '@/components/Charts/NormalizationChart.tsx'
import { Importer } from '@/components/Importer.tsx'
import { Exporter } from '@/components/Exporter.tsx'

export const App = () => {
  const groupAsset = useGroupAsset()
  const setGroupAsset = useSetGroupAsset()

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex gap-x-4">
          <button type="button" className="btn" onClick={() => setGroupAsset((v) => !v)}>
            groupAsset: {groupAsset.toString()}
          </button>
          <Importer />
          <Exporter />
        </div>
        <div className="h-[480px] w-[640px]">
          <BasicChart />
        </div>
        <div className="h-[480px] w-[640px]">
          <NormalizationChart />
        </div>
      </div>
    </div>
  )
}
