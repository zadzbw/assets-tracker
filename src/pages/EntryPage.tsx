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

export const EntryPage = () => {
  const lastRecord = useLastRecord()
  const addAssetRecord = useAddAssetRecord()
  const definitions = useAssetDefinitions()
  const [toast, setToast] = useState(false)
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [usdRate, setUsdRate] = useState<number>(lastRecord?.rate.USD ?? 7.15)

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <label className="flex flex-col gap-1">
            <span className="text-base-content/60 text-sm">记录日期</span>
            <input
              type="date"
              className="input input-bordered"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-base-content/60 text-sm">USD 汇率</span>
            <input
              type="number"
              step="0.0001"
              className="input input-bordered"
              value={usdRate}
              required
              onChange={(e) => setUsdRate(+e.target.value)}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {groupedAssets.map(({ category, label, keys }) => (
            <fieldset
              key={category}
              className="fieldset bg-base-200 border-base-300 rounded-box border p-3"
            >
              <legend className="fieldset-legend text-sm font-medium">{label}</legend>
              {keys.map((key) => {
                const def = definitions[key]
                const displayName = def.category === 'cash' ? `${key}` : key
                return (
                  <Fragment key={key}>
                    <div className="text-base-content/60 mt-1 text-xs">
                      {displayName}
                      <span className="text-base-content/40 ml-1">({def.currency})</span>
                    </div>
                    <input
                      type="number"
                      step="0.001"
                      className="input input-bordered input-sm w-full"
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
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-primary">
            提交记录
          </button>
        </div>
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
