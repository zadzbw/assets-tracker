import type { AssetDefinitionMap } from '@/types/asset.ts'

// 默认资产定义（固定属性）
export const DEFAULT_ASSET_DEFINITIONS: AssetDefinitionMap = {
  BTC: { category: 'crypto', currency: 'USD', risk: 'high' },
  美股: { category: 'stock', currency: 'CNY', risk: 'high' },
  '大 A': { category: 'stock', currency: 'CNY', risk: 'high' },
  黄金: { category: 'gold', currency: 'CNY', risk: 'mid' },
  债券: { category: 'bond', currency: 'CNY', risk: 'low' },
  USD: { category: 'cash', currency: 'USD', risk: 'low' },
  CNY: { category: 'cash', currency: 'CNY', risk: 'low' },
  AED: { category: 'cash', currency: 'AED', risk: 'low' },
}

export type AssetKey = keyof typeof DEFAULT_ASSET_DEFINITIONS
