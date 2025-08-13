import { atom, useAtomValue, useSetAtom } from 'jotai'
import { rateAtom } from '@/models/rate.ts'
import { atomWithStorageSync } from '@/utils/jotai'
import { mergeAssets } from '@/utils/mergeAssets.ts'
import type { RawAssetItem } from '@/types/asset.ts'

const groupAssetAtom = atomWithStorageSync<'group-asset', boolean>('jotai-ls:group-asset', false)

export const useGroupAsset = () => useAtomValue(groupAssetAtom)

export const useSetGroupAsset = () => useSetAtom(groupAssetAtom)

const rawAssetAtom = atomWithStorageSync<'asset', RawAssetItem[]>('jotai-ls:asset', [])

export const useRawAsset = () => useAtomValue(rawAssetAtom)

export const useSetRawAsset = () => useSetAtom(rawAssetAtom)

const assetAtom = atom((get) => {
  const rawAsset = get(rawAssetAtom)

  const rate = get(rateAtom)
  const groupByAsset = get(groupAssetAtom)

  return mergeAssets({ list: rawAsset, rate, isGroup: groupByAsset })
})

export const useAsset = () => useAtomValue(assetAtom)
