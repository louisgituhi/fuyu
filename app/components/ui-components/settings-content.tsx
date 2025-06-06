import type React from "react"
import { ChevronRight, Key, Activity } from "lucide-react"
import { Button } from "../ui/button"
import { signOut, useSession } from "~/lib/auth-client"

interface SettingsItemProps {
  icon?: React.ElementType
  label: string
  value?: string
  onClick?: () => void
}

function SettingsItem({ icon: Icon, label, value, onClick }: SettingsItemProps) {

    return (
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
        >
            <div className="flex items-center gap-3">
                {Icon && <Icon className="h-5 w-5 text-gray-600" />}
                <span className="font-medium text-gray-900">{label}</span>
            </div>

            <div className="flex items-center gap-2">
                {value && <span className="text-gray-500">{value}</span>}
                <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
        </button>
    )
}

export default function SettingsContent() {

    const { data, isPending, error } = useSession();

    return (
        <div className="w-full max-w-xl mx-auto">

            { data?.user && (
                <>
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Account</h2>
                            <div className="bg-gray-50 rounded-lg overflow-hidden">
                                <SettingsItem label="Name" value={ `${ data.user.name }` } />
                                <SettingsItem label="Email" value={ `${ data.user.email }` } />
                            </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4">Security</h2>
                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                            <SettingsItem icon={Key} label="Passkeys" />
                            <SettingsItem icon={Activity} label="Login activity" />
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        <Button
                            className="w-full bg-gray-100 hover:bg-[#FA003F] text-gray-900"
                            onClick={() => 
                                signOut(
                                    {},
                                    {
                                        onError: (error) => {
                                            console.warn("Unable to sign you out", error)
                                        },
                                        onSuccess: () => {
                                            console.log("Signed out successfully")
                                        }
                                    }
                                )
                            }
                        >
                        Log out
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full border-gray-300 text-gray-900 hover:bg-gray-50"
                            onClick={() => {
                                // Handle account deletion
                                alert("Delete account functionality would be implemented here")
                            }}
                        >
                        Delete account
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}