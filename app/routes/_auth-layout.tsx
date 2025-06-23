import { createFileRoute } from '@tanstack/react-router'
import AuthGuard from '~/components/AuthGuard'

export const Route = createFileRoute('/_auth-layout')({
  component: AuthGuard,
})
