import { Card, CardHeader, CardTitle, CardDescription } from '~/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { useSession } from '~/lib/auth-client'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { data } = useSession();

  return (
      <div className="container flex justify-center items-center min-h-[80vh]">
        <Card className="w-fit">
          { data?.user && (
            <div>
              <CardHeader>
                <CardTitle>Welcome, { data.user.name }</CardTitle>
                <CardDescription>
								  You are signed in as {data.user.email}.
							  </CardDescription>
              </CardHeader>
            </div>
          )}
        </Card>
      </div>
  )
}
