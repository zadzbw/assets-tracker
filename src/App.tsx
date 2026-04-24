import { Tabs } from '@/components/Tabs.tsx'
import { DashboardPage } from '@/pages/DashboardPage.tsx'
import { ChartPage } from '@/pages/ChartPage.tsx'
import { NewAssetPage } from '@/pages/NewAssetPage.tsx'
import { DataAndSettingsPage } from '@/pages/DataAndSettingsPage.tsx'

export const App = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-col px-6 py-4">
      <Tabs
        defaultActiveKey="dashboard"
        items={[
          {
            tabKey: 'dashboard',
            label: '总览',
            children: <DashboardPage />,
          },
          {
            tabKey: 'chart',
            label: '图表',
            children: <ChartPage />,
          },
          {
            tabKey: 'new-asset',
            label: '新记录',
            children: <NewAssetPage />,
          },
          {
            tabKey: 'data-and-settings',
            label: '数据 & 设置',
            children: <DataAndSettingsPage />,
          },
        ]}
      />
    </div>
  )
}
