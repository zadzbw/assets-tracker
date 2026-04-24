import { Fragment, useState } from 'react'
import dayjs from 'dayjs'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useAddAssetRecord, useLastRecord, useAssetDefinitions } from '@/models/asset.ts'
import type { AssetCategory, AssetRecord } from '@/types/asset.ts'

const CATEGORY_ORDER: AssetCategory[] = ['crypto', 'stock', 'gold', 'bond', 'cash']

const CATEGORY_LABELS: Record<AssetCategory, string> = {
  crypto: '加密货币',
  stock: '股票',
  gold: '黄金',
  bond: '债券',
  cash: '现金',
}

type FormValues = Record<string, number>

export const NewAssetPage = () => {
  const lastRecord = useLastRecord()
  const addAssetRecord = useAddAssetRecord()
  const definitions = useAssetDefinitions()
  const [toast, setToast] = useState(false)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [usdRate, setUsdRate] = useState<number>(lastRecord?.rate.USD ?? 7.15)

  // 按类别分组资产名称
  const groupedAssets = CATEGORY_ORDER.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    keys: Object.keys(definitions).filter((k) => definitions[k].category === category),
  })).filter((g) => g.keys.length > 0)

  const { register, handleSubmit, reset } = useForm<FormValues>({
    mode: 'all',
    defaultValues: lastRecord
      ? lastRecord.values
      : Object.keys(definitions).reduce((acc, key) => {
          acc[key] = 0
          return acc
        }, {} as FormValues),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const record: AssetRecord = {
      date: new Date(date),
      rate: { USD: usdRate },
      values: data,
    }

    addAssetRecord(record)

    setToast(true)
    setTimeout(() => setToast(false), 2000)

    reset(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-wrap gap-4">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend">记录日期</legend>
            <input
              type="date"
              className="input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
            <legend className="fieldset-legend">USD 汇率</legend>
            <input
              type="number"
              step="0.0001"
              className="input"
              value={usdRate}
              required
              onChange={(e) => setUsdRate(+e.target.value)}
            />
          </fieldset>
        </div>

        {groupedAssets.map(({ category, label, keys }) => (
          <fieldset
            key={category}
            className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
          >
            <legend className="fieldset-legend">{label}</legend>

            {keys.map((key) => {
              const def = definitions[key]
              return (
                <Fragment key={key}>
                  <div className="label">
                    {def.category === 'cash' ? '现金' : key} - ({def.currency})
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
          </fieldset>
        ))}

        <button type="submit" className="btn btn-outline btn-primary w-xs">
          确认
        </button>
      </form>

      {toast && (
        <div className="toast toast-end toast-top">
          <div className="alert alert-success">
            <span>创建成功</span>
          </div>
        </div>
      )}
    </>
  )
}
