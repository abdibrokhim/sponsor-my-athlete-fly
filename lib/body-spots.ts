import type { AdSpot } from "./types"

export type BodySpotId =
  | "head"
  | "left-eye"
  | "right-eye"
  | "left-shoulder"
  | "right-shoulder"
  | "left-chest"
  | "right-chest"
  | "chest-center"
  | "left-wing"
  | "right-wing"
  | "abdomen"
  | "left-thigh"
  | "right-thigh"
  | "right-arm"

export interface BodySpot {
  id: BodySpotId
  label: string
  /** Anchor position on the fly (normalized to a ~1.9m tall figure, y=0 at feet). */
  position: [number, number, number]
  /** Approximate surfacing radius for the interactive marker. */
  radius: number
  /** Base listing price in USD. */
  basePrice: number
  /** Which image view this spot belongs to (marker facing). */
  view: "front" | "back" | "left" | "right"
  /** Rough description shown in the tooltip. */
  hint: string
  /** Form-control ordering. */
  order: number
}

export const BODY_SPOTS: BodySpot[] = [
  {
    id: "head",
    label: "Head",
    position: [0, 1.66, 0.22],
    radius: 0.12,
    basePrice: 7000,
    view: "front",
    hint: "Between the antennae",
    order: 1,
  },
  {
    id: "left-eye",
    label: "Left compound eye",
    position: [-0.15, 1.66, 0.3],
    radius: 0.08,
    basePrice: 8000,
    view: "front",
    hint: "Prime real estate",
    order: 2,
  },
  {
    id: "right-eye",
    label: "Right compound eye",
    position: [0.15, 1.66, 0.3],
    radius: 0.08,
    basePrice: 8000,
    view: "front",
    hint: "Prime real estate",
    order: 3,
  },
  {
    id: "left-shoulder",
    label: "Left shoulder",
    position: [-0.28, 1.45, 0.1],
    radius: 0.1,
    basePrice: 7000,
    view: "front",
    hint: "Thorax deltoid",
    order: 4,
  },
  {
    id: "right-shoulder",
    label: "Right shoulder",
    position: [0.3, 1.47, 0.14],
    radius: 0.1,
    basePrice: 7000,
    view: "front",
    hint: "Thorax deltoid",
    order: 5,
  },
  {
    id: "left-chest",
    label: "Left chest",
    position: [-0.14, 1.3, 0.4],
    radius: 0.1,
    basePrice: 9000,
    view: "front",
    hint: "Upper thorax",
    order: 6,
  },
  {
    id: "right-chest",
    label: "Right chest",
    position: [0.15, 1.32, 0.42],
    radius: 0.1,
    basePrice: 9000,
    view: "front",
    hint: "Upper thorax",
    order: 7,
  },
  {
    id: "chest-center",
    label: "Thorax center",
    position: [0, 1.3, 0.44],
    radius: 0.1,
    basePrice: 10000,
    view: "front",
    hint: "Front and center",
    order: 8,
  },
  {
    id: "left-wing",
    label: "Left wing",
    position: [-0.5, 0.82, -0.05],
    radius: 0.16,
    basePrice: 15000,
    view: "left",
    hint: "Full wing takeover",
    order: 9,
  },
  {
    id: "right-wing",
    label: "Right wing",
    position: [0.55, 0.86, -0.05],
    radius: 0.16,
    basePrice: 15000,
    view: "right",
    hint: "Full wing takeover",
    order: 10,
  },
  {
    id: "abdomen",
    label: "Abdomen",
    position: [0, 1.0, 0.43],
    radius: 0.12,
    basePrice: 8000,
    view: "front",
    hint: "Belly of the beast",
    order: 11,
  },
  {
    id: "left-thigh",
    label: "Left thigh",
    position: [-0.16, 0.68, 0.15],
    radius: 0.1,
    basePrice: 4000,
    view: "front",
    hint: "Lower body",
    order: 12,
  },
  {
    id: "right-thigh",
    label: "Right thigh",
    position: [0.18, 0.7, 0.15],
    radius: 0.1,
    basePrice: 4000,
    view: "front",
    hint: "Lower body",
    order: 13,
  },
  {
    id: "right-arm",
    label: "Raised arm",
    position: [0.52, 1.62, 0.36],
    radius: 0.1,
    basePrice: 6000,
    view: "front",
    hint: "Victory pose",
    order: 14,
  },
]

export const SPOT_BY_ID = Object.fromEntries(
  BODY_SPOTS.map((s) => [s.id, s]),
) as Record<BodySpotId, BodySpot>

export function getSpot(id: string): BodySpot | undefined {
  return SPOT_BY_ID[id as BodySpotId]
}

export const DEFAULT_SPOT_PRICES = Object.fromEntries(
  BODY_SPOTS.map((s) => [s.id, s.basePrice]),
) as Record<BodySpotId, number>

export function buildDefaultSpots(overrides?: Record<string, number>): AdSpot[] {
  return BODY_SPOTS.map((spot) => ({
    id: spot.id,
    price: overrides?.[spot.id] ?? spot.basePrice,
    status: "available" as const,
    views: 0,
  }))
}
