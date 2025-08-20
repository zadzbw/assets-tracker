import { Tabs } from '@/components/Tabs.tsx'
import { ChartPage } from '@/pages/ChartPage.tsx'
import { NewRecordPage } from '@/pages/NewRecordPage.tsx'
import { DataPage } from '@/pages/DataPage.tsx'

export const App = () => {
  return (
    <div className="flex flex-col">
      <Tabs
        defaultActiveKey="add-record"
        items={[
          {
            tabKey: 'chart',
            label: '资产图表',
            children: <ChartPage />,
          },
          {
            tabKey: 'add-record',
            label: '添加资产记录',
            children: <NewRecordPage />,
          },

          {
            tabKey: 'data',
            label: '资产数据',
            children: <DataPage />,
          },
        ]}
      />
    </div>
  )
}
