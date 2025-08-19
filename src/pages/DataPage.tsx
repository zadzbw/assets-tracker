import ReactJson from 'react-json-view'
import { Importer } from '@/components/Importer.tsx'
import { Exporter } from '@/components/Exporter.tsx'
import { useRawAsset } from '@/models/asset.ts'

export const DataPage = () => {
  const rawAssetData = useRawAsset()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <Importer />
        <Exporter />
      </div>
      <ReactJson
        src={rawAssetData}
        name="data"
        indentWidth={2}
        collapsed={2}
        displayDataTypes={false}
        iconStyle="triangle"
      />
    </div>
  )
}
