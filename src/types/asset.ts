import type { Currency } from '@/types/currency'

export type AssetCategory = 'crypto' | 'stock' | 'gold' | 'bond' | 'cash'

interface CryptoAsset {
  name: string
  value: number
  category: 'crypto'
  currency: 'USD'
  risk: 'high'
}

interface StockAsset {
  name: string
  value: number
  category: 'stock'
  currency: 'CNY'
  risk: 'high'
}

interface GoldAsset {
  name: string
  value: number
  category: 'gold'
  currency: 'CNY'
  risk: 'mid'
}

interface BondAsset {
  name: string
  value: number
  category: 'bond'
  currency: 'CNY'
  risk: 'low'
}

interface CashAsset {
  name: string
  value: number
  category: 'cash'
  currency: Currency
  risk: 'low'
}

export type Asset = CryptoAsset | StockAsset | GoldAsset | BondAsset | CashAsset

export type InputAsset =
  | Omit<CryptoAsset, 'value'>
  | Omit<StockAsset, 'value'>
  | Omit<GoldAsset, 'value'>
  | Omit<BondAsset, 'value'>
  | Omit<CashAsset, 'value'>

export type AssetRecord = {
  date: Date
  assets: Array<Asset>
}

// merge 后的数据
export type BaseAsset = Omit<Asset, 'currency' | 'value'> & {
  value: number[]
}
