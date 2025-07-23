import { useCallback, useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback(() => {
    setCount((v) => v + 1)
  }, [])

  return (
    <button
      type="button"
      className="bg-button-bg rounded-lg border border-transparent px-4 py-2 font-medium transition-[border-color] duration-200 hover:border-indigo-500"
      onClick={handleClick}
    >
      count is {count}
    </button>
  )
}
