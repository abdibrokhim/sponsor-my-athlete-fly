"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Info } from "lucide-react"
import { ViewerScene } from "@/components/three/ViewerScene"
import { SpotAdDialog } from "@/components/spot-ad-dialog"
import { SpotListSheet } from "@/components/spot-list-sheet"
import { Countdown, nextRaceDate } from "@/components/countdown"
import { LiveFeed } from "@/components/live-feed"
import type { AdSpot, Avatar } from "@/lib/types"

export function BodyHud({
  avatar,
  className,
  hideTitle = false,
}: {
  avatar: Avatar
  className?: string
  hideTitle?: boolean
}) {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [spots, setSpots] = useState<AdSpot[]>(() => avatar.spots)

  const onSelect = (id: string) => setSelectedSpot(id)

  const onBid = (
    id: string,
    bid: {
      brandName: string
      brandLogoUrl?: string
      brandUrl?: string
      price: number
    },
  ) => {
    setSpots((prev) =>
      prev.map((spot) =>
        spot.id === id
          ? {
              ...spot,
              status: "taken",
              price: bid.price,
              brandName: bid.brandName,
              brandLogoUrl: bid.brandLogoUrl,
              brandUrl: bid.brandUrl,
              currentBidder: bid.brandName.toLowerCase().replace(/[^a-z0-9]/g, ""),
              views: spot.views + 1,
            }
          : spot,
      ),
    )
    setSelectedSpot(null)
  }

  const selectedSpotData = spots.find((s) => s.id === selectedSpot)

  return (
    <div className={`relative ${className ?? ""}`}>
      <ViewerScene
        modelUrl={avatar.modelUrl}
        spots={spots}
        selectedSpot={selectedSpot ?? undefined}
        onSelect={onSelect}
        interactive={!selectedSpot && !listOpen}
        className="h-full w-full"
      />

      {/* Top-left title block */}
      {!hideTitle && (
        <div className="pointer-events-none absolute left-5 top-5 max-w-xs select-none">
          <h1 className="font-mono text-lg font-semibold tracking-tight text-cyan-glow sm:text-xl">
            Sponsor the fruit fly
          </h1>
          <p className="pt-1 text-sm text-slate-300">
            Bid for a spot. Your logo rides on the fly.
          </p>
          <p className="pt-1 text-xs text-slate-500">
            <span className="text-[10px] uppercase tracking-widest text-slate-600">
              Auction
            </span>{" "}
            · 2d 15h left ·{" "}
            <Link href="/how-it-works" className="underline underline-offset-2 hover:text-cyan-300">
              How it works?
            </Link>
          </p>
        </div>
      )}

      {/* Top-right countdown */}
      <div className="pointer-events-none absolute right-5 top-5">
        <Countdown target={nextRaceDate()} />
      </div>

      {/* Bottom-left stats */}
      <div className="pointer-events-none absolute bottom-5 left-5">
        <LiveFeed baseViews={avatar.views} />
      </div>

      {/* Bottom-center bid CTA */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          onClick={() => setListOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_24px_rgba(70,213,255,0.35)] transition-all hover:bg-cyan-200"
        >
          Place a bid
          <ArrowUpRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => setListOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-colors hover:text-cyan-300"
          aria-label="Info"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>

      {/* Bottom-right profile chip */}
      <div className="pointer-events-none absolute bottom-5 right-5 hidden items-center gap-2 sm:flex">
        <div className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-3 py-1.5 text-xs text-slate-200">
          This is{" "}
          <span className="text-cyan-200">@{avatar.twitter ?? avatar.name}</span>
          <span className="pl-1 text-slate-500">· 100% catchy fly</span>
        </div>
      </div>

      <SpotListSheet
        spots={spots}
        open={listOpen}
        onOpenChange={setListOpen}
        onSelect={onSelect}
      />
      <SpotAdDialog
        avatarName={avatar.name}
        spot={selectedSpotData}
        open={!!selectedSpot}
        onOpenChange={(open) => !open && setSelectedSpot(null)}
        onBid={onBid}
      />
    </div>
  )
}
