import type { InputAsset } from '@/types/asset.ts'

export const INPUT_ASSET_MAP = {
  BTC: { name: 'BTC', category: 'crypto', currency: 'USD', risk: 'high' } as InputAsset,

  USStock: { name: '美股', category: 'stock', currency: 'CNY', risk: 'high' } as InputAsset,
  CNStock: { name: '大 A', category: 'stock', currency: 'CNY', risk: 'high' } as InputAsset,

  Gold: { name: '黄金', category: 'gold', currency: 'CNY', risk: 'mid' } as InputAsset,

  Bond: { name: '债券', category: 'bond', currency: 'CNY', risk: 'low' } as InputAsset,

  USD: { name: 'USD', category: 'cash', currency: 'USD', risk: 'low' } as InputAsset,
  CNY: { name: 'CNY', category: 'cash', currency: 'CNY', risk: 'low' } as InputAsset,
  AED: { name: 'AED', category: 'cash', currency: 'AED', risk: 'low' } as InputAsset,
} as const
