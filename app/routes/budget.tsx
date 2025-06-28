import { createFileRoute } from '@tanstack/react-router'
import BudgetContent from '~/components/BudgetContent'
import BudgetPage from '~/components/BudgetPage'
import DashboardPage from '~/components/DashboardPage'

export const Route = createFileRoute('/budget')({
  component: () => <DashboardPage><BudgetContent /></DashboardPage>
})