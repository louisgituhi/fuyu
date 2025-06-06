import { ChevronRight } from "lucide-react"
import type React from "react"
interface MenuItemProps {
    icon: React.ElementType
    label: string
    onClick?: () => void
    showChevron?: boolean
}

export default function MenuItem({ icon: Icon, label, onClick, showChevron = true }: 
    MenuItemProps) {
        return (
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg group"
            >
                <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{label}</span>
                </div>
                {showChevron && <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />}
            </button>
        )
    }