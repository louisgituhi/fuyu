import { createFileRoute } from '@tanstack/react-router'
import Signin from '~/signin/page'

export const Route = createFileRoute('/auth/signin')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Signin />
    </div>
  )
}
