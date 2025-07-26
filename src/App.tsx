import { Charts } from '@/components/Charts/Charts.tsx'
import { useRate, useSetRateByCurrency } from '@/models/rate.ts'

export const App = () => {
  const rate = useRate()
  const setRateByCurrency = useSetRateByCurrency()

  console.log(rate)

  return (
    <div className="flex flex-col">
      <div onClick={() => setRateByCurrency('USD', 7)}>USD: {rate.USD}</div>
      <div className="h-[480px] w-[640px]">
        <Charts />
      </div>
    </div>
  )
}
