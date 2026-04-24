import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorageSync } from '@/utils/jotai'
import { mergeAssets } from '@/utils/mergeAssets.ts'
import { DEFAULT_ASSET_DEFINITIONS } from '@/constants/asset.ts'
import type { AssetDefinitionMap, AssetRecord } from '@/types/asset.ts'

// 资产定义表
export const assetDefinitionsAtom = atomWithStorageSync<'asset-definitions', AssetDefinitionMap>(
  'jotai-ls:asset-definitions',
  DEFAULT_ASSET_DEFINITIONS,
)

export const useAssetDefinitions = () => useAtomValue(assetDefinitionsAtom)
export const useSetAssetDefinitions = () => useSetAtom(assetDefinitionsAtom)

// 图表聚合开关
const groupAssetAtom = atomWithStorageSync<'group-asset', boolean>('jotai-ls:group-asset', false)

export const useGroupAsset = () => useAtomValue(groupAssetAtom)
export const useSetGroupAsset = () => useSetAtom(groupAssetAtom)

// 资产记录列表
export const assetRecordListAtom = atomWithStorageSync<'asset-record-list', AssetRecord[]>(
  'jotai-ls:asset-record-list',
  [],
)

export const useAssetRecordList = () => useAtomValue(assetRecordListAtom)
export const useSetAssetRecordList = () => useSetAtom(assetRecordListAtom)

export const useAddAssetRecord = () => {
  const update = useSetAtom(assetRecordListAtom)
  return (record: AssetRecord) => {
    update((prev) => [...prev, record])
  }
}

// 最后一条记录的 values（用于表单预填）
const lastRecordAtom = atom((get) => {
  const list = get(assetRecordListAtom)
  const last = list.at(-1)
  return last ?? null
})

export const useLastRecord = () => useAtomValue(lastRecordAtom)

// 图表数据
const chartAssetAtom = atom((get) => {
  const list = get(assetRecordListAtom)
  const definitions = get(assetDefinitionsAtom)
  const isGroup = get(groupAssetAtom)

  return mergeAssets({ list, definitions, isGroup })
})

export const useChartAsset = () => useAtomValue(chartAssetAtom)
