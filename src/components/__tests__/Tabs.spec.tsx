import { useState } from 'react'
import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-react'
import { Tabs } from '../Tabs'

const items = [
  {
    tabKey: '1',
    label: 'Tab 1',
    children: 'Tab Content 1',
  },
  {
    tabKey: '2',
    label: 'Tab 2',
    children: 'Tab Content 2',
  },
  {
    tabKey: '3',
    label: 'Tab 3',
    children: 'Tab Content 3',
  },
]

describe('`Tabs` component test', () => {
  it('should render active tab content', async () => {
    const { container, getByText } = render(<Tabs items={items} defaultActiveKey="2" />)

    const tabContent1 = getByText('Tab Content 1')
    const tabContent2 = getByText('Tab Content 2')
    const tabContent3 = getByText('Tab Content 3')

    const tab2 = getByText('Tab 2')

    await expect.element(tabContent1).not.toBeInTheDocument()
    await expect.element(tabContent2).toBeInTheDocument()
    await expect.element(tabContent3).not.toBeInTheDocument()

    await expect.element(tabContent2).toHaveClass('tab-content')
    await expect.element(tab2).toHaveClass('tab tab-active')

    expect(container.firstElementChild).toMatchSnapshot()
  })

  it('should switch tab content', async () => {
    const { getByText } = render(<Tabs items={items} defaultActiveKey="2" />)

    await getByText('Tab 1').click()
    await expect.element(getByText('Tab Content 1')).toBeInTheDocument()

    await getByText('Tab 3').click()
    await expect.element(getByText('Tab Content 3')).toBeInTheDocument()
  })

  it('should keep DOM of hidden tab(opened previously)', async () => {
    const { getByText } = render(<Tabs items={items} defaultActiveKey="2" />)

    // 最开始没有 Tab Content 1 的 DOM
    await expect.element(getByText('Tab Content 1')).not.toBeInTheDocument()

    await getByText('Tab 1').click()
    await expect.element(getByText('Tab 1')).toHaveClass('tab tab-active')
    await expect.element(getByText('Tab Content 1')).toBeInTheDocument()

    await getByText('Tab 2').click()
    await expect.element(getByText('Tab 2')).toHaveClass('tab tab-active')
    // 即使切换到 2 以后，Tab Content 1 的 DOM 也依然存在
    await expect.element(getByText('Tab Content 1')).toBeInTheDocument()
  })

  it('should destroy DOM of hidden tab', async () => {
    const { getByText } = render(
      <Tabs
        items={[
          {
            tabKey: '1',
            label: 'Tab 1',
            children: 'Tab Content 1',
            destroyOnHidden: true,
          },
          {
            tabKey: '2',
            label: 'Tab 2',
            children: 'Tab Content 2',
          },
        ]}
        defaultActiveKey="2"
      />,
    )

    // 最开始没有 Tab Content 1 的 DOM
    await expect.element(getByText('Tab Content 1')).not.toBeInTheDocument()

    await getByText('Tab 1').click()
    await expect.element(getByText('Tab 1')).toHaveClass('tab tab-active')
    await expect.element(getByText('Tab Content 1')).toBeInTheDocument()
    await expect.element(getByText('Tab Content 2')).toBeInTheDocument()

    await getByText('Tab 2').click()
    await expect.element(getByText('Tab 2')).toHaveClass('tab tab-active')
    // 切换到 2 以后，Tab Content 1 的 DOM 被销毁
    await expect.element(getByText('Tab Content 1')).not.toBeInTheDocument()
  })

  it('should force render DOM of hidden tab', async () => {
    const { getByText } = render(
      <Tabs
        items={[
          {
            tabKey: '1',
            label: 'Tab 1',
            children: 'Tab Content 1',
            forceRender: true,
          },
          {
            tabKey: '2',
            label: 'Tab 2',
            children: 'Tab Content 2',
          },
        ]}
        defaultActiveKey="2"
      />,
    )

    // 最开始 Tab Content 1 的 DOM 也会存在
    await expect.element(getByText('Tab Content 1')).toBeInTheDocument()
    await expect.element(getByText('Tab Content 2')).toBeInTheDocument()
  })

  it('Controlled - should switch tab content', async () => {
    const Test = () => {
      const [key, setKey] = useState('1')
      return <Tabs items={items} activeKey={key} onChange={setKey} />
    }

    const { getByText } = render(<Test />)

    await getByText('Tab 1').click()
    await expect.element(getByText('Tab Content 1')).toBeInTheDocument()

    await getByText('Tab 3').click()
    await expect.element(getByText('Tab Content 3')).toBeInTheDocument()
  })
})
