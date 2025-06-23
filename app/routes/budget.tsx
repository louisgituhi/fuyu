import { createFileRoute } from '@tanstack/react-router'
import BudgetPage from '~/components/BudgetPage'

export const Route = createFileRoute('/budget')({
  component: BudgetPage
})