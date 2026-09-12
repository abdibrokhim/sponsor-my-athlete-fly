import { buildDefaultSpots } from "./body-spots"
import type { AdSpot, Avatar } from "./types"

export const FRUIT_FLY_MODEL_URL = "/fruit-fly.glb"

function logo(bg: string, text: string, fg = "#111"): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" rx="14" fill="#${bg}"/><text x="40" y="52" font-size="26" font-family="sans-serif" fill="${fg}" text-anchor="middle">${text}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

function spot(id: string, opts: Partial<AdSpot> = {}): AdSpot {
  const defaults = buildDefaultSpots()
  const base = defaults.find((s) => s.id === id)!
  return { ...base, views: 1200, ...opts }
}

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
  spots: [
    spot("right-wing", {
      status: "taken",
      price: 16500,
      brandName: "AadiBioN",
      brandLogoUrl: logo("ffb02e", "A"),
      currentBidder: "aadibion",
    }),
    spot("left-wing", {
      status: "taken",
      price: 15200,
      brandName: "GoBeryl",
      brandLogoUrl: logo("7c5cff", "G", "#fff"),
      currentBidder: "goberyl",
    }),
    spot("right-chest", {
      status: "taken",
      price: 9200,
      brandName: "Tempo AI",
      brandLogoUrl: logo("22d3ee", "T"),
      currentBidder: "tempo",
    }),
    spot("left-eye", {
      status: "taken",
      price: 8600,
      brandName: "TesterArmy",
      brandLogoUrl: logo("f87171", "T", "#fff"),
      currentBidder: "testerarmy",
    }),
    spot("abdomen", {
      status: "taken",
      price: 8100,
      brandName: "LinkBunny",
      brandLogoUrl: logo("a3e635", "LB"),
      currentBidder: "linkbunny",
    }),
    ...buildDefaultSpots()
      .filter(
        (s) =>
          !["right-wing", "left-wing", "right-chest", "left-eye", "abdomen"].includes(
            s.id,
          ),
      )
      .map((s) => ({ ...s, views: 640 })),
  ],
}
