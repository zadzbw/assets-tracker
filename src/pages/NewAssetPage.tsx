import { Fragment } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { INPUT_ASSET_MAP } from '@/constants/asset.ts'
import { useAddNewAsset } from '@/models/asset.ts'
import type { AssetRecord } from '@/types/asset.ts'

type NewAssetValue = {
  [key in keyof typeof INPUT_ASSET_MAP]: number
}

export const NewAssetPage = () => {
  const { register, handleSubmit, reset } = useForm<NewAssetValue>({
    mode: 'all',
  })

  const addNewAsset = useAddNewAsset()

  const onSubmit: SubmitHandler<NewAssetValue> = (data) => {
    const newAsset: AssetRecord = {
      date: new Date(),
      asset: [],
    }

    for (const newAssetKey in data) {
      newAsset.asset.push({
        ...INPUT_ASSET_MAP[newAssetKey as keyof typeof INPUT_ASSET_MAP],
        value: data[newAssetKey as keyof typeof INPUT_ASSET_MAP],
      })
    }

    addNewAsset(newAsset)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">新增一条记录</legend>

        {Object.keys(INPUT_ASSET_MAP).map((k) => {
          const key = k as keyof typeof INPUT_ASSET_MAP
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

        <button type="submit" className="btn btn-primary mt-4">
          确认
        </button>
      </fieldset>
    </form>
  )
}
