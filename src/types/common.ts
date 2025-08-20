import type { BaseRateRecord } from '@/types/currency.ts'
import type { AssetRecord } from '@/types/asset.ts'

export type GlobalData = {
  rate: BaseRateRecord
  asset: AssetRecord[]
}
