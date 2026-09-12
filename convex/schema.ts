import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

const highlightStatus = v.union(
  v.literal("available"),
  v.literal("taken"),
  v.literal("outbid"),
)

const adSpot = v.object({
  id: v.string(),
  price: v.number(),
  status: highlightStatus,
  views: v.number(),
  brandName: v.optional(v.string()),
  brandLogoUrl: v.optional(v.string()),
  brandUrl: v.optional(v.string()),
  brandTagline: v.optional(v.string()),
  currentBidder: v.optional(v.string()),
})

export default defineSchema({
  avatars: defineTable({
    name: v.string(),
    email: v.string(),
    twitter: v.string(),
    instagram: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    bio: v.optional(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("failed"),
    ),
    modelUrl: v.optional(v.string()),
    modelTaskId: v.optional(v.string()),
    imageUrls: v.object({
      front: v.string(),
      back: v.string(),
      left: v.string(),
      right: v.string(),
    }),
    spots: v.array(adSpot),
    views: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" }),
})
