export type BaseCurrency = 'USD'

export type Currency = BaseCurrency | 'AED' | 'CNY'

export type BaseRateRecord = Record<BaseCurrency, number>

export type RateRecord = Record<Currency, number>
