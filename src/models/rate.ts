import BigNumber from 'bignumber.js'
import type { RateRecord } from '@/types/currency.ts'

// 从 USD 汇率计算完整的汇率记录
export const buildRateRecord = (usdRate: number): RateRecord => ({
  USD: usdRate,
  CNY: 1,
  AED: +BigNumber(usdRate).div(3.67).toFixed(2),
})
