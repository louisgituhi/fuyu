import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '~/components/DashboardPage';
import ExpensesContent from '~/components/ExpensesContent';

export const Route = createFileRoute('/')({
  component: () => <DashboardPage><ExpensesContent /></DashboardPage>,
})