import type { Doc } from "./_generated/dataModel"
import { v } from "convex/values"
import { mutation, query } from "./_generated/server"

export const AVATAR_STATUS = {
  pending: "pending",
  processing: "processing",
  ready: "ready",
  failed: "failed",
} as const

export type AvatarStatus = (typeof AVATAR_STATUS)[keyof typeof AVATAR_STATUS]

export const listReady = query({
  handler: async ({ db }) => {
    const avatars = await db.query("avatars").collect()
    return avatars
      .filter((a) => a.status === "ready")
      .sort((a, b) => b.views - a.views)
  },
})

export const get = query({
  args: { id: v.id("avatars") },
  handler: async ({ db }, { id }) => {
    return await db.get(id)
  },
})

export const listAll = query({
  handler: async ({ db }) => {
    return await db.query("avatars").collect()
  },
})

export const bumpViews = mutation({
  args: { id: v.id("avatars") },
  handler: async ({ db }, { id }) => {
    const avatar = await db.get(id)
    if (avatar) {
      await db.patch(id, { views: avatar.views + 1 })
    }
  },
})

export const claimSpot = mutation({
  args: {
    id: v.id("avatars"),
    spotId: v.string(),
    brandName: v.string(),
    brandUrl: v.optional(v.string()),
    brandLogoUrl: v.optional(v.string()),
    status: v.union(v.literal("available"), v.literal("taken"), v.literal("outbid")),
  },
  handler: async ({ db }, { id, spotId, brandName, brandUrl, brandLogoUrl, status }) => {
    const avatar = await db.get(id)
    if (!avatar) return

    type Spot = {
      id: string
      price: number
      status: "available" | "taken" | "outbid"
      views: number
      brandName?: string
      brandUrl?: string
      brandLogoUrl?: string
      brandTagline?: string
      currentBidder?: string
    }

    const spots: Spot[] = (avatar.spots as Spot[]).map((spot) =>
      spot.id === spotId
        ? {
            ...spot,
            status,
            brandName,
            brandUrl,
            brandLogoUrl,
            views: spot.views + 1,
          }
        : spot,
    )

    await db.patch(id, { spots })
  },
})

export type AvatarDoc = Doc<"avatars">
