import { useRef } from 'react'
import { useSetRate } from '@/models/rate.ts'
import { useSetAssetRecordList } from '@/models/asset.ts'
import type { GlobalData } from '@/types/common.ts'

export const Importer = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const setRate = useSetRate()
  const setAssetRecordList = useSetAssetRecordList()

  const handleChoose = () => {
    inputRef.current?.click()
  }

  const readFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const text = String(reader.result ?? '')
        const { rateData, assetData }: GlobalData = JSON.parse(text)
        // TODO: data type check
        setRate(rateData.USD)
        setAssetRecordList(assetData)
      } catch (e) {
        console.log('数据导入失败', e)
      }
    }
    reader.readAsText(file, 'utf-8')
  }

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) {
      return
    }
    // 仅取第一个文件
    const file = files[0]
    readFile(file)
  }

  return (
    <button type="button" className="btn btn-primary" onClick={handleChoose}>
      导入数据
      <input
        ref={inputRef}
        type="file"
        accept={'.json,application/json'}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </button>
  )
}
