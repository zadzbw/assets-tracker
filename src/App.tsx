import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs } from '@/components/Tabs.tsx'
import { PortfolioPage } from '@/pages/PortfolioPage.tsx'
import { AnalysisPage } from '@/pages/AnalysisPage.tsx'
import { EntryPage } from '@/pages/EntryPage.tsx'
import { DataPage } from '@/pages/DataPage.tsx'

const TABS = [
  { tabKey: 'portfolio', label: '持仓概况', children: <PortfolioPage /> },
  { tabKey: 'analysis', label: '走势分析', children: <AnalysisPage /> },
  { tabKey: 'entry', label: '资产录入', children: <EntryPage /> },
  { tabKey: 'data', label: '数据管理', children: <DataPage /> },
]

const DEFAULT_TAB = TABS[0].tabKey
const VALID_KEYS = new Set(TABS.map((t) => t.tabKey))

export const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const path = location.pathname.replace(/^\//, '')
  const activeKey = VALID_KEYS.has(path) ? path : DEFAULT_TAB

  const handleChange = (key: string) => {
    navigate(key === DEFAULT_TAB ? '/' : `/${key}`, { replace: true })
  }

  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col px-6 py-4">
      <Tabs activeKey={activeKey} onChange={handleChange} items={TABS} />
    </div>
  )
}
