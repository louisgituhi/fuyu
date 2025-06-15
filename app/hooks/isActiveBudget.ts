import { useQuery } from "@tanstack/react-query";

export function useActiveBudget() {
    return useQuery({
        queryKey: ["active-budget"],
        queryFn: async () => {
            const res = await fetch('/api/active-budget')

            if (!res.ok) {
                const msg = await res.text()
                console.error('Failed:', msg)
                throw new Error('Failed to fetch active budget')
            }

            return res.json()
        }
    })
}