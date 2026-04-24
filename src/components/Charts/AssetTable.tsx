import { useMemo } from 'react'
import { useChartAsset } from '@/models/asset.ts'

type AssetRow = {
  name: string
  value: number
  percent: number
  prevValue: number
  change: number
  changePercent: number
}

export const AssetTable = () => {
  const { date, total, asset } = useChartAsset()

  const { rows, latestTotal, totalChange, totalChangePercent, latestDate } =
    useMemo(() => {
      const lastIdx = date.length - 1
      const prevIdx = date.length - 2
      const lt = total[lastIdx] ?? 0
      const pt = prevIdx >= 0 ? total[prevIdx] ?? 0 : 0
      const tc = lt - pt
      const tcp = pt === 0 ? 0 : +((tc / pt) * 100).toFixed(2)

      const rows: AssetRow[] = asset.map((item) => {
        const v = item.value[lastIdx] ?? 0
        const pv = prevIdx >= 0 ? item.value[prevIdx] ?? 0 : 0
        const c = v - pv
        const cp = pv === 0 ? 0 : +((c / pv) * 100).toFixed(2)
        return {
          name: item.name,
          value: +v.toFixed(2),
          percent: lt === 0 ? 0 : +((v / lt) * 100).toFixed(1),
          prevValue: +pv.toFixed(2),
          change: +c.toFixed(2),
          changePercent: cp,
        }
      })

      return {
        rows,
        latestTotal: +lt.toFixed(2),
        prevTotal: +pt.toFixed(2),
        totalChange: +tc.toFixed(2),
        totalChangePercent: tcp,
        latestDate: date[lastIdx] ?? '',
      }
    }, [date, total, asset])

  const fmtChange = (val: number, pct: number) => {
    const sign = val >= 0 ? '+' : ''
    const color = val > 0 ? 'text-success' : val < 0 ? 'text-error' : ''
    return (
      <span className={color}>
        {sign}
        {val.toLocaleString()} ({sign}
        {pct}%)
      </span>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-auto">
      <div className="text-base-content/60 mb-1 text-xs">{latestDate}</div>
      <table className="table-xs table">
        <thead>
          <tr>
            <th>资产</th>
            <th className="text-right">价值</th>
            <th className="text-right">占比</th>
            <th className="text-right">变化</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className="font-medium">{row.name}</td>
              <td className="text-right">{row.value.toLocaleString()}</td>
              <td className="text-right">{row.percent}%</td>
              <td className="text-right text-xs">{fmtChange(row.change, row.changePercent)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-bold">
            <td>Total</td>
            <td className="text-right">{latestTotal.toLocaleString()}</td>
            <td className="text-right">100%</td>
            <td className="text-right text-xs">
              {fmtChange(totalChange, totalChangePercent)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
