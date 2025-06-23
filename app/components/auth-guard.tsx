import type React from "react";
import { useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { useSession } from "~/lib/auth-client";
import LoadingCircle from "./loading-circle";

export default function AuthGuard({ children }: { children: React.ReactNode}) {
    const { data, isPending } = useSession()
    const { navigate } = useRouter()

    useEffect(() => {
        if (isPending) return;

        const isAuthPage = location.pathname.startsWith("/auth")
        const isLoggedIn = !!data?.user

        if (!isLoggedIn && !isAuthPage) {
            navigate({ to: '/auth/signin' })
        } else if (isLoggedIn && isAuthPage) {
            navigate({ to: "/" })
        }
    }, [isPending, data, navigate])

    if (isPending) {
        return (
            <div className=" h-screen w-full flex items-center justify-center">
                <LoadingCircle />
            </div>
        )
    }

    return <> { children }</>
}