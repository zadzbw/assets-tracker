import { Counter } from '@/components/Counter'

export default function App() {
  return (
    <div className="flex-center min-h-screen min-w-[320px]">
      <div className="space-y-12 text-center">
        <h1 className="text-5xl font-bold">Vite + React</h1>
        <div>
          <Counter />
          <p className="my-4">
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-500">Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  )
}
