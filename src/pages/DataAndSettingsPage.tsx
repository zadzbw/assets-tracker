import { useState } from 'react'
import ReactJson from 'react-json-view'
import { Importer } from '@/components/Importer.tsx'
import { Exporter } from '@/components/Exporter.tsx'
import { useAssetRecordList, useSetAssetRecordList } from '@/models/asset.ts'
import { useRawRate, useSetRate } from '@/models/rate.ts'
import type { AssetRecord } from '@/types/asset.ts'

const Settings = () => {
  const { USD } = useRawRate()
  const setRate = useSetRate()

  const [value, setValue] = useState<number | ''>(USD)

  return (
    <fieldset className="fieldset w-xs">
      <legend className="fieldset-legend">修改 USD 汇率</legend>
      <div className="join">
        <input
          value={value}
          type="number"
          step="0.0001"
          name="rate"
          className="input join-item"
          placeholder="修改 USD 汇率"
          onChange={(e) => {
            const inputValue = e.target.value
            if (inputValue) {
              return setValue(+(+inputValue).toFixed(4))
            }
            setValue('')
          }}
        />
        <button
          type="button"
          className="btn btn-neutral join-item"
          onClick={() => {
            if (typeof value === 'number') {
              setRate(value)
            }
          }}
        >
          保存
        </button>
      </div>
    </fieldset>
  )
}

const DataView = () => {
  const assetRecordList = useAssetRecordList()
  const setAssetRecordList = useSetAssetRecordList()

  return (
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
  )
}

export const DataAndSettingsPage = () => {
  return (
    <div className="flex flex-col">
      <Settings />
      <div className="divider" />
      <div className="flex items-center gap-x-4">
        <Importer />
        <Exporter />
      </div>
      <div className="divider" />
      <DataView />
    </div>
  )
}
