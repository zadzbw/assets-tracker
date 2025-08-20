import { Tabs } from '@/components/Tabs.tsx'
import { ChartPage } from '@/pages/ChartPage.tsx'
import { NewAssetPage } from '@/pages/NewAssetPage.tsx'
import { DataAndSettingsPage } from '@/pages/DataAndSettingsPage.tsx'

export const App = () => {
  return (
    <div className="flex flex-col">
      <Tabs
        defaultActiveKey="new-asset"
        items={[
          {
            tabKey: 'chart',
            label: '资产图表',
            children: <ChartPage />,
          },
          {
            tabKey: 'new-asset',
            label: '创建资产记录',
            children: <NewAssetPage />,
          },

          {
            tabKey: 'data-and-settings',
            label: '资产数据 & 设置',
            children: <DataAndSettingsPage />,
          },
        ]}
      />
    </div>
  )
}
