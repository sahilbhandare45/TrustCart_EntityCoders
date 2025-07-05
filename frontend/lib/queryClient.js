// lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const res = await fetch(queryKey[0])
        if (!res.ok) throw new Error("Network response was not ok")
        return res.json()
      },
    },
  },
})
