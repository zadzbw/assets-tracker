import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'
import type { AssetCategory, AssetDefinitionMap, BaseAsset, AssetRecord } from '@/types/asset.ts'
import { buildRateRecord } from '@/models/rate.ts'

export const groupByKey = <T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> => {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const key = keyFn(item)
    const group = map.get(key)
    if (group) {
      group.push(item)
    } else {
      map.set(key, [item])
    }
  }
  return map
}

// 将单个资产原币值转为 CNY
export const valueToCNY = (
  value: number,
  currency: string,
  usdRate: number,
): number => {
  const rate = buildRateRecord(usdRate)
  return +BigNumber(value).multipliedBy(rate[currency as keyof typeof rate] ?? 1).toFixed(2)
}

const groupAndSumByCategory = (data: BaseAsset[]) => {
  const map = new Map<AssetCategory, BaseAsset>()
  for (const item of data) {
    const { category, risk } = item
    const vals = Array.isArray(item.value) ? item.value : []

    if (!map.has(category)) {
      map.set(category, {
        category,
        name: category === 'stock' ? '股票' : category === 'cash' ? '现金' : item.name,
        value: [],
        risk,
      })
    }

    const acc = map.get(category)!.value
    const maxLen = Math.max(acc.length, vals.length)
    while (acc.length < maxLen) {
      acc.push(0)
    }
    for (let i = 0; i < vals.length; i++) {
      acc[i] = +BigNumber(acc[i]).plus(vals[i]).toFixed(2)
    }
  }

  return Array.from(map, ([, value]) => value)
}

export const mergeAssets = ({
  list,
  definitions,
  isGroup,
}: {
  list: AssetRecord[]
  definitions: AssetDefinitionMap
  isGroup: boolean
}) => {
  // 提取所有日期
  const dates = list.map((item) => dayjs(item.date).format('YYYY-MM-DD'))

  // 收集所有唯一的资产名称
  const assetNames = [...new Set(list.flatMap((item) => Object.keys(item.values)))]

  // 为每个资产创建合并后的对象
  let mergedAssets: BaseAsset[] = assetNames
    .filter((name) => definitions[name]) // 只处理有定义的资产
    .map((assetName) => {
      const def = definitions[assetName]

      // 收集每个日期该资产的 value（转 CNY）
      const values = list.map((record) => {
        const rawValue = record.values[assetName]
        if (rawValue === undefined || rawValue === null) return 0
        return valueToCNY(rawValue, def.currency, record.rate.USD)
      })

      return {
        name: assetName,
        category: def.category,
        risk: def.risk,
        value: values,
      }
    })

  if (isGroup) {
    mergedAssets = groupAndSumByCategory(mergedAssets)
  }

  // 计算总值
  const total = mergedAssets.reduce((acc, item) => {
    item.value.forEach((val, index) => {
      acc[index] = BigNumber(acc[index] || 0)
        .plus(val)
        .toNumber()
    })
    return acc
  }, [] as number[])

  return {
    date: dates,
    total,
    asset: mergedAssets,
  }
}
