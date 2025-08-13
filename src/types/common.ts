import type { BaseRateRecord } from '@/types/currency.ts'
import type { RawAssetItem } from '@/types/asset.ts'

export type GlobalData = {
  rate: BaseRateRecord
  asset: RawAssetItem[]
}
