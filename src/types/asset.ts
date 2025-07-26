import type { Currency } from '@/types/currency'

export type AssetItem = {
  name: string
  value: number
  risk: 'high' | 'low'
  currency: Currency
}
