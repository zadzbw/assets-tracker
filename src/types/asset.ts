import type { Currency } from '@/types/currency'

export type Risk = 'high' | 'mid' | 'low'

export type AssetCategory = 'crypto' | 'stock' | 'gold' | 'bond' | 'cash'

// 原始数据
interface RawAsset {
  name: string
  value: number
  currency: Currency
  category: AssetCategory
  risk: Risk
}

interface CryptoAsset extends RawAsset {
  category: 'crypto'
  risk: 'high'
  currency: 'USD'
}

interface StockAsset extends RawAsset {
  category: 'stock'
  risk: 'high'
}

interface GoldAsset extends RawAsset {
  category: 'gold'
  risk: 'mid'
}

interface BondAsset extends RawAsset {
  category: 'bond'
  risk: 'low'
}

interface CashAsset extends RawAsset {
  category: 'cash'
  risk: 'low'
}

export type RawAssetItem = {
  date: Date
  asset: Array<CryptoAsset | StockAsset | GoldAsset | BondAsset | CashAsset>
}

// merge 后的数据
export type BaseAsset = Omit<RawAsset, 'currency' | 'value'> & {
  value: number[]
}
