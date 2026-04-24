import type { Currency } from '@/types/currency'

export type AssetCategory = 'crypto' | 'stock' | 'gold' | 'bond' | 'cash'

export type RiskLevel = 'high' | 'mid' | 'low'

// 资产固定属性定义
export type AssetDefinition = {
  category: AssetCategory
  currency: Currency
  risk: RiskLevel
}

// 按资产名称索引的定义表
export type AssetDefinitionMap = Record<string, AssetDefinition>

// 每期记录：日期 + 当日汇率 + 各资产数值
export type AssetRecord = {
  date: Date
  rate: { USD: number }
  values: Record<string, number>
}

// ---- 以下为图表用的中间类型 ----

// merge 后的数据（跨时间的单个资产）
export type BaseAsset = {
  name: string
  category: AssetCategory
  risk: RiskLevel
  value: number[]
}

// ---- 兼容旧类型（保留给 constants/asset.ts） ----

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
