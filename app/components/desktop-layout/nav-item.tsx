import type React from "react";

interface NavItemProps {
    icon: React.ElementType
    label: string
    isActive?: boolean
    onClick?: () => void
}
export default function NavItem({ icon: Icon, label, isActive, onClick }: NavItemProps) {
  return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                isActive ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
        >
            <Icon className="h-5 w-5 text-gray-700" />
            <span className="font-medium text-gray-900">{label}</span>
        </button>
  )
}