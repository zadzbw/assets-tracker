import ReactJson from 'react-json-view'
import { Importer } from '@/components/Importer.tsx'
import { Exporter } from '@/components/Exporter.tsx'
import { useAssetRecordList, useSetAssetRecordList } from '@/models/asset.ts'
import type { AssetRecord } from '@/types/asset.ts'

export const DataPage = () => {
  const assetRecordList = useAssetRecordList()
  const setAssetRecordList = useSetAssetRecordList()

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-4">
        <Importer />
        <Exporter />
      </div>
      <ReactJson
        src={assetRecordList}
        name="data"
        indentWidth={2}
        collapsed={2}
        displayDataTypes={false}
        iconStyle="triangle"
        onDelete={(del) => {
          if (confirm('确认要删除该条记录？')) {
            setAssetRecordList(del.updated_src as AssetRecord[])
            return true
          }
          return false
        }}
      />
    </div>
  )
}
