"use client"

import { ConvexProvider as ConvexProviderCore, ConvexReactClient } from "convex/react"
import { useMemo } from "react"

let clientSingleton: ConvexReactClient | null = null

function getClient() {
  if (!clientSingleton) {
    clientSingleton = new ConvexReactClient(
      process.env.NEXT_PUBLIC_CONVEX_URL || "https://demo.convex.cloud",
    )
  }
  return clientSingleton
}

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  const client = useMemo(() => getClient(), [])

  // Queries are "skipped" when not configured, so a stub client is harmless.
  return <ConvexProviderCore client={client}>{children}</ConvexProviderCore>
}
