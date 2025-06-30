import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-20">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-lg md:rounded-xl flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 md:mb-3">{title}</h2>
            <p className="text-gray-500 text-center">{description}</p>
        </div>
    )
}
