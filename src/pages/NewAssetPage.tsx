import { Fragment } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAddAssetRecord, useLastAssetRecord } from '@/models/asset.ts'
import { type AssetKey, INPUT_ASSET_MAP } from '@/constants/asset.ts'
import type { AssetRecord } from '@/types/asset.ts'

type NewAssetValue = {
  [key in keyof typeof INPUT_ASSET_MAP]: number
}

export const NewAssetPage = () => {
  const lastAssetRecord = useLastAssetRecord()
  const addAssetRecord = useAddAssetRecord()

  const { register, handleSubmit, reset } = useForm<NewAssetValue>({
    mode: 'all',
    defaultValues: lastAssetRecord.reduce((result, current) => {
      result[current.name as AssetKey] = current.value
      return result
    }, {} as NewAssetValue),
  })

  const onSubmit: SubmitHandler<NewAssetValue> = (data) => {
    const assetRecord: AssetRecord = {
      date: new Date(),
      assets: [],
    }

    for (const newAssetKey in data) {
      assetRecord.assets.push({
        ...INPUT_ASSET_MAP[newAssetKey as AssetKey],
        value: data[newAssetKey as AssetKey],
      })
    }

    addAssetRecord(assetRecord)
    alert('创建成功')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">新数据</legend>

        {Object.keys(INPUT_ASSET_MAP).map((k) => {
          const key = k as AssetKey
          const { name, currency, category } = INPUT_ASSET_MAP[key]
          return (
            <Fragment key={key}>
              <div className="label">
                {category === 'cash' ? '现金' : name} - ({currency})
              </div>
              <input
                type="number"
                step="0.001"
                className="input validator"
                required
                {...register(key, {
                  required: true,
                  valueAsNumber: true,
                })}
              />
            </Fragment>
          )
        })}

        <button type="submit" className="btn btn-outline btn-primary mt-4">
          确认
        </button>
      </fieldset>
    </form>
  )
}
