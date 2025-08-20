import dayjs from 'dayjs'
import BigNumber from 'bignumber.js'
import { omit } from 'es-toolkit'
import type { AssetCategory, BaseAsset, AssetRecord } from '@/types/asset.ts'
import type { RateRecord } from '@/types/currency.ts'

const groupAndSumByCategory = (data: BaseAsset[]) => {
  const map = new Map<AssetCategory, BaseAsset>()
  for (const item of data) {
    const { category, risk } = item
    const vals = Array.isArray(item.value) ? item.value : []

    if (!map.has(category)) {
      map.set(category, {
        category: category,
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

  return Array.from(map, ([, value]) => {
    return value
  })
}

export const mergeAssets = ({
  list,
  rate,
  isGroup,
}: {
  list: AssetRecord[]
  rate: RateRecord
  isGroup: boolean
}) => {
  // 提取所有日期
  const dates = list.map((item) => dayjs(item.date).format('YYYY-MM-DD'))

  // 收集所有唯一的资产名称
  const assetNames = [...new Set(list.flatMap((item) => item.assets.map((asset) => asset.name)))]

  // 为每个资产创建合并后的对象
  let mergedAssets: BaseAsset[] = assetNames.map((assetName) => {
    // 找到第一个包含该资产的项目作为模板
    const template = list
      .flatMap((item) => {
        return item.assets
      })
      .find((asset) => {
        return asset.name === assetName
      })!

    // 收集每个日期该资产的 value
    const values = list.map((item) => {
      const asset = item.assets.find((asset) => {
        return asset.name === assetName
      })
      return asset ? +BigNumber(asset.value).multipliedBy(rate[asset.currency]).toFixed(2) : 0 // 如果某个日期没有该资产，默认为 0
    })

    return {
      ...omit(template, ['currency']),
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
