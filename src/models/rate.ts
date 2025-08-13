import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorageSync } from '@/utils/jotai'
import type { BaseRateRecord, RateRecord } from '@/types/currency.ts'
import BigNumber from 'bignumber.js'

const rawRateAtom = atomWithStorageSync<'currency-rate', BaseRateRecord>('jotai-ls:currency-rate', {
  USD: 7.15,
})

export const rateAtom = atom((get) => {
  const baseRate = get(rawRateAtom)
  const rate: RateRecord = {
    ...baseRate,
    CNY: 1,
    AED: +BigNumber(baseRate.USD).div(3.67).toFixed(2),
  }

  return rate
})

export const useRawRate = () => {
  return useAtomValue(rawRateAtom)
}

export const useSetRate = () => {
  const set = useSetAtom(rawRateAtom)

  return (value: number) => {
    set({ USD: value })
  }
}
