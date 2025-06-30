"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "@tanstack/react-router"

interface MobileHeaderProps {
  title: string
}

export function MobileHeader({ title }: MobileHeaderProps) {
  const router = useRouter()

  return (
    <div className="md:hidden flex items-center p-4 border-b bg-white">
      <Button variant="ghost" size="icon" onClick={() => router.history.back()} className="mr-3">
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-lg font-semibold">{title}</h1>
    </div>
  )
}
