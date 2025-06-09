import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter
} from '@tanstack/react-router'
import { useEffect } from 'react'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from "@tanstack/react-query"
import type * as React from 'react'
import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { NotFound } from '~/components/not-found'
import LoadingCircle from '~/components/loading-circle'
import { useSession } from '~/lib/auth-client'
import appCss from '~/styles/app.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ],
      links: [
      { 
        rel: 'stylesheet', href: appCss 
      },
      { 
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { 
        rel: 'manifest', href: '/site.webmanifest', color: '#fffff' 
      },
      { 
        rel: 'icon', href: '/favicon.ico' 
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {

  const { data, isPending } = useSession();
  const { navigate } = useRouter()

  useEffect(() => {
    if (isPending) return

    if (!data?.user) {
      if (!location.pathname.startsWith("/auth")) {
        navigate({ to: "/auth/signin" })
      }
    } else {
      if (location.pathname.startsWith("/auth")) {
        navigate({ to: "/"});
      }
    }
  }, [isPending, data, navigate]);

  if (isPending) {
    return (
      <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-karla bg-white">
        <LoadingCircle />
        <Scripts />
      </body>
    </html>
    )
  }

  return (
    <html lang='en'>

      <head>
        <HeadContent />
      </head>

      <body className=' font-karla'>

        <hr />
        {children}

        <TanStackRouterDevtools position="bottom-right" />

        <Scripts />

      </body>

    </html>
  )
}