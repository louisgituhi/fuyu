import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '~/components/dashboard/dashboard-page';

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
      <div>
        <DashboardPage />
      </div>
  )
}
