import type { InputAsset } from '@/types/asset.ts'

export type AssetKey = 'BTC' | '美股' | '大 A' | '黄金' | '债券' | 'USD' | 'CNY' | 'AED'

export const INPUT_ASSET_MAP: Record<AssetKey, InputAsset> = {
  BTC: { name: 'BTC', category: 'crypto', currency: 'USD', risk: 'high' } as InputAsset,

  美股: { name: '美股', category: 'stock', currency: 'CNY', risk: 'high' } as InputAsset,
  '大 A': { name: '大 A', category: 'stock', currency: 'CNY', risk: 'high' } as InputAsset,

  黄金: { name: '黄金', category: 'gold', currency: 'CNY', risk: 'mid' } as InputAsset,

  债券: { name: '债券', category: 'bond', currency: 'CNY', risk: 'low' } as InputAsset,

  USD: { name: 'USD', category: 'cash', currency: 'USD', risk: 'low' } as InputAsset,
  CNY: { name: 'CNY', category: 'cash', currency: 'CNY', risk: 'low' } as InputAsset,
  AED: { name: 'AED', category: 'cash', currency: 'AED', risk: 'low' } as InputAsset,
}
