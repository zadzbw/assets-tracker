import { atom, useAtomValue } from 'jotai'
import BigNumber from 'bignumber.js'
import dayjs from 'dayjs'
import { assetRecordListAtom, assetDefinitionsAtom } from '@/models/asset.ts'
import { valueToCNY, groupByKey } from '@/utils/mergeAssets.ts'
import type { AssetCategory } from '@/types/asset.ts'
import type { Currency } from '@/types/currency.ts'

const CATEGORY_LABELS: Record<AssetCategory, string> = {
  crypto: '加密货币',
  stock: '股票',
  gold: '黄金',
  bond: '债券',
  cash: '现金',
}

const RISK_LABELS: Record<string, string> = {
  high: '高风险',
  mid: '中风险',
  low: '低风险',
}

type SnapshotAsset = {
  name: string
  category: AssetCategory
  currency: Currency
  risk: string
  rawValue: number
  cnValue: number
}

// 最新快照（所有值转 CNY）
const latestSnapshotAtom = atom((get) => {
  const list = get(assetRecordListAtom)
  const definitions = get(assetDefinitionsAtom)

  if (list.length === 0) return null

  const latest = list[list.length - 1]
  const assets: SnapshotAsset[] = Object.entries(latest.values)
    .filter(([name]) => definitions[name])
    .map(([name, rawValue]) => {
      const def = definitions[name]
      return {
        name,
        category: def.category,
        currency: def.currency,
        risk: def.risk,
        rawValue,
        cnValue: valueToCNY(rawValue, def.currency, latest.rate.USD),
      }
    })

  const totalCNY = assets.reduce((sum, a) => +BigNumber(sum).plus(a.cnValue).toFixed(2), 0)

  return {
    date: dayjs(latest.date).format('YYYY-MM-DD'),
    assets,
    totalCNY,
  }
})

export const useLatestSnapshot = () => useAtomValue(latestSnapshotAtom)

// 与上期对比
const portfolioChangeAtom = atom((get) => {
  const list = get(assetRecordListAtom)
  const definitions = get(assetDefinitionsAtom)

  if (list.length < 2) return null

  const calcTotal = (index: number) => {
    const record = list[index]
    return Object.entries(record.values)
      .filter(([name]) => definitions[name])
      .reduce((sum, [name, value]) => {
        const def = definitions[name]
        return +BigNumber(sum).plus(valueToCNY(value, def.currency, record.rate.USD)).toFixed(2)
      }, 0)
  }

  const currentTotal = calcTotal(list.length - 1)
  const previousTotal = calcTotal(list.length - 2)
  const absoluteChange = +BigNumber(currentTotal).minus(previousTotal).toFixed(2)
  const percentChange =
    previousTotal === 0
      ? 0
      : +BigNumber(absoluteChange).div(previousTotal).multipliedBy(100).toFixed(2)

  const previousDate = dayjs(list[list.length - 2].date).format('YYYY-MM-DD')

  return { absoluteChange, percentChange, previousTotal, currentTotal, previousDate }
})

export const usePortfolioChange = () => useAtomValue(portfolioChangeAtom)

// 按类别分组
const allocationByCategoryAtom = atom((get) => {
  const snapshot = get(latestSnapshotAtom)
  if (!snapshot) return []

  const grouped = groupByKey(snapshot.assets, (a) => a.category)
  return Array.from(grouped, ([category, assets]) => {
    const value = assets.reduce((sum, a) => +BigNumber(sum).plus(a.cnValue).toFixed(2), 0)
    return {
      category: category as AssetCategory,
      label: CATEGORY_LABELS[category as AssetCategory] || category,
      value,
      percent:
        snapshot.totalCNY === 0
          ? 0
          : +BigNumber(value).div(snapshot.totalCNY).multipliedBy(100).toFixed(1),
    }
  })
})

export const useAllocationByCategory = () => useAtomValue(allocationByCategoryAtom)

// 按风险等级分组
const allocationByRiskAtom = atom((get) => {
  const snapshot = get(latestSnapshotAtom)
  if (!snapshot) return []

  const grouped = groupByKey(snapshot.assets, (a) => a.risk)
  return Array.from(grouped, ([risk, assets]) => {
    const value = assets.reduce((sum, a) => +BigNumber(sum).plus(a.cnValue).toFixed(2), 0)
    return {
      risk,
      label: RISK_LABELS[risk] || risk,
      value,
      percent:
        snapshot.totalCNY === 0
          ? 0
          : +BigNumber(value).div(snapshot.totalCNY).multipliedBy(100).toFixed(1),
    }
  })
})

export const useAllocationByRisk = () => useAtomValue(allocationByRiskAtom)

// 按币种分组
const allocationByCurrencyAtom = atom((get) => {
  const snapshot = get(latestSnapshotAtom)
  if (!snapshot) return []

  const grouped = groupByKey(snapshot.assets, (a) => a.currency)
  return Array.from(grouped, ([currency, assets]) => {
    const value = assets.reduce((sum, a) => +BigNumber(sum).plus(a.cnValue).toFixed(2), 0)
    return {
      currency: currency as Currency,
      label: currency,
      value,
      percent:
        snapshot.totalCNY === 0
          ? 0
          : +BigNumber(value).div(snapshot.totalCNY).multipliedBy(100).toFixed(1),
    }
  })
})

export const useAllocationByCurrency = () => useAtomValue(allocationByCurrencyAtom)
