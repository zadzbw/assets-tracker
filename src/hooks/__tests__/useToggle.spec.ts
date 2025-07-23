import { describe, it, expect } from 'vitest'
import { renderHook } from 'vitest-browser-react'
import { useToggle } from '@/hooks'

describe('`useToggle` hooks test', () => {
  it('should get correct value and toggle it', async () => {
    const { act, result } = renderHook(() => useToggle(true))
    const { toggleValue } = result.current

    expect(result.current.value).toBe(true)
    act(() => {
      toggleValue()
    })
    expect(result.current.value).toBe(false)
    act(() => {
      toggleValue()
    })
    expect(result.current.value).toBe(true)
  })
})
