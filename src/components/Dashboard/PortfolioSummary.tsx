import { useLatestSnapshot, usePortfolioChange } from '@/models/portfolio.ts'

export const PortfolioSummary = () => {
  const snapshot = useLatestSnapshot()
  const change = usePortfolioChange()

  if (!snapshot) {
    return (
      <div className="bg-base-200 rounded-box p-6 text-center">
        <p className="text-base-content/60">暂无数据，请先创建资产记录</p>
      </div>
    )
  }

  const isPositive = change && change.absoluteChange >= 0

  return (
    <div className="stats bg-base-200 w-full shadow">
      <div className="stat">
        <div className="stat-title">总资产 (CNY)</div>
        <div className="stat-value text-primary">{snapshot.totalCNY.toLocaleString()}</div>
        <div className="stat-desc">截至 {snapshot.date}</div>
      </div>

      {change && (
        <>
          <div className="stat">
            <div className="stat-title">较上期变化</div>
            <div className={`stat-value text-lg ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? '+' : ''}
              {change.absoluteChange.toLocaleString()}
            </div>
            <div className="stat-desc">上期 ({change.previousDate}): {change.previousTotal.toLocaleString()}</div>
          </div>

          <div className="stat">
            <div className="stat-title">涨跌幅</div>
            <div className={`stat-value text-lg ${isPositive ? 'text-success' : 'text-error'}`}>
              {isPositive ? '+' : ''}
              {change.percentChange}%
            </div>
          </div>
        </>
      )}
    </div>
  )
}
