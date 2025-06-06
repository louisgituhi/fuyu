import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useRouter
} from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type * as React from 'react'
import { DefaultCatchBoundary } from '~/components/default-catch-boundary'
import { NotFound } from '~/components/not-found'
import { signOut, useSession } from '~/lib/auth-client'
import appCss from '~/styles/app.css?url'
import { Button } from '~/components/ui/button'

export const Route = createRootRoute({
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

  const { data, isPending, error } = useSession();
  const { navigate } = useRouter()

  useEffect(() => {
    if (!data?.user) {
      if (!location.pathname.includes("/auth")) {
        navigate({ to: "/auth/signin"})
      }
    } else {
      navigate({ to: "/" })
    }
  }, [data, navigate])

  return (
    <html lang='en'>

      <head>
        <HeadContent />
      </head>

      <body className=' font-karla'>

        <div>

          <div>
            { data?.user ? (
              <p>Hello { data.user.name }</p>
            ) : (
              <></>
            )}
          </div>

          <div>
            { data?.user && (
              <Button onClick={() => {
                signOut(
                  {},
                  {
                    onError: (error) => {
                      console.warn(error)
                    },
                    onSuccess: () => {
                      console.log("You have been signed out")
                    },
                  },
                )
              }}
              variant="destructive"
              />
            )}
          </div>

        </div>

        <hr />
        {children}

        <TanStackRouterDevtools position="bottom-right" />

        <Scripts />

      </body>

    </html>
  )
}