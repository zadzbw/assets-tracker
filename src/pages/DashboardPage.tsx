import { PortfolioSummary } from '@/components/Dashboard/PortfolioSummary.tsx'
import { AllocationOverview } from '@/components/Dashboard/AllocationOverview.tsx'

export const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <PortfolioSummary />
      <AllocationOverview />
    </div>
  )
}
