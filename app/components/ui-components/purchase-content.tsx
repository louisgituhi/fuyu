import { Sparkles } from "lucide-react"

export default function PurchasesContent() {
  return (
        <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center">
            <div className="h-16 w-16 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Purchases</h1>
            <p className="text-gray-500">Your Fuyu purchases will show up here</p>
        </div>
  )
}