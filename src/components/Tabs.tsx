import { type FC, type ReactNode, useRef, useState, useEffect, Fragment } from 'react'
import { clsx } from 'clsx'

interface TabItemType {
  tabKey: string
  label: ReactNode
  children: ReactNode
  destroyOnHidden?: boolean // 被隐藏时是否销毁 DOM 结构，优先级比 forceRender 更高
  forceRender?: boolean // 被隐藏时是否渲染 DOM 结构
}

interface TabNavType extends Pick<TabItemType, 'tabKey' | 'label'> {
  isActive: boolean
  onChange: (activeKey: string) => void
}

interface TabContentType extends Omit<TabItemType, 'tabKey' | 'label'> {
  isActive: boolean
}

interface BaseTabsProps {
  items: TabItemType[]
}

interface ControlledTabsProps extends BaseTabsProps {
  activeKey: string
  onChange: (activeKey: string) => void
}

interface UnControlledTabsProps extends BaseTabsProps {
  defaultActiveKey: string
}

type TabsProps = ControlledTabsProps | UnControlledTabsProps

const TabNav: FC<TabNavType> = ({ isActive, label, tabKey, onChange }) => {
  return (
    <div
      className={clsx('tab', { 'tab-active': isActive })}
      onClick={() => {
        if (!isActive) {
          onChange(tabKey)
        }
      }}
    >
      {label}
    </div>
  )
}

const TabContent: FC<TabContentType> = ({
  isActive,
  children,
  destroyOnHidden = false,
  forceRender = false,
}) => {
  const isMounted = useRef<boolean>(false)

  const content = (
    <div
      ref={() => {
        isMounted.current = true
      }}
      className="tab-content border-base-300 bg-base-100 p-4"
    >
      {children}
    </div>
  )

  if (destroyOnHidden) {
    return isActive && content
  }
  if (forceRender) {
    return content
  }
  if (isMounted.current) {
    return content
  }
  return isActive && content
}

export const Tabs: FC<TabsProps> = (props) => {
  const { items } = props
  const isControlled = 'activeKey' in props

  // 组件内部 state
  const [activeKey, setActiveKey] = useState(() =>
    isControlled ? props.activeKey : props.defaultActiveKey,
  )

  const handleChange = (key: string) => {
    if (isControlled) {
      props.onChange(key)
    } else {
      setActiveKey(key)
    }
  }

  // 受控组件，props.activeKey 如果变更，需要更新内部 state
  useEffect(() => {
    if (isControlled) {
      setActiveKey(props.activeKey)
    }
  }, [isControlled, isControlled && props.activeKey])

  return (
    <div className="tabs tabs-border">
      {items.map(({ tabKey, label, ...rest }) => {
        const isActive = tabKey === activeKey
        return (
          <Fragment key={tabKey}>
            <TabNav isActive={isActive} tabKey={tabKey} label={label} onChange={handleChange} />
            <TabContent isActive={isActive} {...rest} />
          </Fragment>
        )
      })}
    </div>
  )
}
