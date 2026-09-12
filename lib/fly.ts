import { buildDefaultSpots } from "./body-spots"
import type { Avatar } from "./types"

export const FRUIT_FLY_MODEL_URL = "/fruit-fly.glb"

/**
 * The one and only ad surface in the marketplace: a very swole fruit fly.
 * Every wing, eye and thigh is up for bid.
 */
export const FLY: Avatar = {
  _id: "the-fly",
  name: "Fruit Fly",
  twitter: "thefruitfly",
  instagram: "thefruitfly",
  bio: "A very swole fruit fly. Every wing, eye and thigh is for sale.",
  status: "ready",
  modelUrl: FRUIT_FLY_MODEL_URL,
  views: 48210,
  spots: buildDefaultSpots(),
}
