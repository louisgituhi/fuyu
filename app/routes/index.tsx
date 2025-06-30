import { createFileRoute } from '@tanstack/react-router'
import { DashboardLayout } from '~/components/DashboardLayout'

export const Route = createFileRoute('/')({
  component: HomePage
})

function HomePage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-full" />
    </DashboardLayout>
  )
}