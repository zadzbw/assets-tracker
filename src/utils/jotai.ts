import {
  // eslint-disable-next-line no-restricted-imports
  atomWithStorage as JotaiAtomWithStorage,
} from 'jotai/utils'
import type { KebabCase } from '@/types/helper.ts'

type StorageAtomKey<S extends string> = `jotai-ls:${KebabCase<S>}`

export const atomWithStorage = <Key extends string, Value>(
  key: StorageAtomKey<Key>,
  initialValue: Value,
) => {
  return JotaiAtomWithStorage(key, initialValue, undefined, { getOnInit: false })
}

export const atomWithStorageSync = <Key extends string, Value>(
  key: StorageAtomKey<Key>,
  initialValue: Value,
) => {
  return JotaiAtomWithStorage(key, initialValue, undefined, { getOnInit: true })
}
