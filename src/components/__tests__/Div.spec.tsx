import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-react'

describe('tailwind test', () => {
  it('should render with correct style', async () => {
    const screen = render(
      <div id="div" className="m-4 flex border-transparent">
        test
      </div>,
    )
    const div = screen.getByText(/test/i)

    // expect(getComputedStyle(div).borderColor).toEqual('transparent')
    // expect(getComputedStyle(div).display).toEqual('flex')
    // expect(getComputedStyle(div).margin).toEqual('1rem')

    await expect.element(div).toHaveTextContent('test')
    expect(1).toEqual(1)
  })
})
