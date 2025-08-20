import { useRawAsset } from '@/models/asset.ts'
import { useRawRate } from '@/models/rate.ts'
import type { GlobalData } from '@/types/common.ts'

const safeStringify = (value: unknown): string => {
  const seen = new WeakSet()
  return (
    JSON.stringify(
      value,
      (_, val) => {
        if (typeof val === 'object' && val !== null) {
          if (seen.has(val)) {
            return '[Circular]'
          }
          seen.add(val)
        }
        return val
      },
      2,
    ) ?? ''
  )
}

export const Exporter = () => {
  const rawRateData = useRawRate()
  const rawAssetData = useRawAsset()

  const exportData = () => {
    const data: GlobalData = {
      rate: rawRateData,
      asset: rawAssetData,
    }
    try {
      const json = safeStringify(data)
      const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
      const url = URL.createObjectURL(blob)

      const a = document.createElement('a')
      a.href = url
      a.download = 'assets-tracker-data.json'
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('下载失败：', err)
      alert('下载失败，请检查数据格式或控制台错误。')
    }
  }

  return (
    <button type="button" className="btn btn-secondary" onClick={exportData}>
      导出数据
    </button>
  )
}
