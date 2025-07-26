import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorageSync } from '@/utils/jotai'
import type { BaseCurrency, Currency } from '@/types/currency.ts'

const baseRateAtom = atomWithStorageSync<'currency-rate', Record<BaseCurrency, number>>(
  'jotai-ls:currency-rate',
  {
    USD: 7.15,
  },
)

const rateAtom = atom((get) => {
  const baseRate = get(baseRateAtom)
  const rate: Record<Currency, number> = {
    ...baseRate,
    CNY: 1,
    AED: baseRate.USD / 3.67,
  }

  return rate
})

export const useRate = () => {
  return useAtomValue(rateAtom)
}

export const useSetRateByCurrency = () => {
  const set = useSetAtom(baseRateAtom)
  return (currency: BaseCurrency, value: number) => {
    set((prev) => ({
      ...prev,
      [currency]: value,
    }))
  }
}
