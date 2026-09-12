import type { BodySpotId } from "./body-spots"

export type SpotStatus = "available" | "taken" | "outbid"
export type AvatarStatus = "pending" | "processing" | "ready" | "failed"

export interface AdSpot {
  id: string
  price: number
  status: SpotStatus
  views: number
  brandName?: string
  brandLogoUrl?: string
  brandUrl?: string
  brandTagline?: string
  currentBidder?: string
}

export interface AvatarImages {
  front?: string
  back?: string
  left?: string
  right?: string
}

export interface Avatar {
  _id: string
  name: string
  email?: string
  twitter?: string
  instagram?: string
  linkedin?: string
  bio?: string
  status: AvatarStatus
  modelUrl?: string
  modelTaskId?: string
  imageUrls?: AvatarImages
  spots: AdSpot[]
  views: number
}

export type SpotMap = Record<BodySpotId, AdSpot>
