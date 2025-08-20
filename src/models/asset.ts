import { atom, useAtomValue, useSetAtom } from 'jotai'
import { rateAtom } from '@/models/rate.ts'
import { atomWithStorageSync } from '@/utils/jotai'
import { mergeAssets } from '@/utils/mergeAssets.ts'
import type { AssetRecord } from '@/types/asset.ts'

const groupAssetAtom = atomWithStorageSync<'group-asset', boolean>('jotai-ls:group-asset', false)

export const useGroupAsset = () => useAtomValue(groupAssetAtom)

export const useSetGroupAsset = () => useSetAtom(groupAssetAtom)

const assetRecordListAtom = atomWithStorageSync<'asset-record-list', AssetRecord[]>(
  'jotai-ls:asset-record-list',
  [],
)

export const useAssetRecordList = () => useAtomValue(assetRecordListAtom)

export const useSetAssetRecordList = () => useSetAtom(assetRecordListAtom)

export const useAddAssetRecord = () => {
  const update = useSetAtom(assetRecordListAtom)
  return (asset: AssetRecord) => {
    update((prev) => [...prev, asset])
  }
}

const lastAssetRecordAtom = atom((get) => {
  const assetRecordList = get(assetRecordListAtom)
  const last = assetRecordList.at(-1)
  if (last) {
    return last.assets
  }
  return []
})

export const useLastAssetRecord = () => useAtomValue(lastAssetRecordAtom)

const chartAssetAtom = atom((get) => {
  const assetRecordList = get(assetRecordListAtom)

  const rate = get(rateAtom)
  const groupByAsset = get(groupAssetAtom)

  return mergeAssets({ list: assetRecordList, rate, isGroup: groupByAsset })
})

export const useChartAsset = () => useAtomValue(chartAssetAtom)
