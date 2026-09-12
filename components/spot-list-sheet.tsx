"use client"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Eye, ChevronRight, TrendingUp } from "lucide-react"
import { BODY_SPOTS } from "@/lib/body-spots"
import type { AdSpot } from "@/lib/types"

export function SpotListSheet({
  spots,
  open,
  onOpenChange,
  onSelect,
}: {
  spots: AdSpot[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (id: string) => void
}) {
  const byId = new Map(spots.map((s) => [s.id, s]))
  const orderedSpots = BODY_SPOTS.map((def) => byId.get(def.id))
    .filter(Boolean)
    .sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0) || a!.id.localeCompare(b!.id))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[22rem] border-cyan-400/20 bg-slate-950/95 backdrop-blur-xl sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-lg text-white">
            Where do you want to advertise your brand?
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-1 overflow-y-auto px-4 pb-6">
          {orderedSpots.map((spot) => {
            if (!spot) return null
            const def = BODY_SPOTS.find((d) => d.id === spot.id)
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => {
                  onOpenChange(false)
                  onSelect(spot.id)
                }}
                className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition-all hover:border-cyan-400/20 hover:bg-cyan-400/[0.04]"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-white">
                    {def?.label ?? spot.id}{" "}
                    <span className="ml-1 inline-flex items-center gap-1 text-[11px] font-normal text-slate-500">
                      <Eye className="h-3 w-3" />
                      {(spot.views || 0).toLocaleString()} views
                    </span>
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                    {spot.status === "available" ? (
                      <>
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5">
                          Available
                        </span>
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5">
                          {spot.brandLogoUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={spot.brandLogoUrl}
                              alt=""
                              className="h-3.5 w-3.5 rounded object-contain"
                            />
                          )}
                          {spot.brandName ?? "Outbid"}
                        </span>
                        <span className="text-cyan-200/70">current sponsor</span>
                      </span>
                    )}
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-sm text-cyan-glow">
                    ${Number(spot.price).toLocaleString()}
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </span>
              </button>
            )
          })}

          <button
            type="button"
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-cyan-400/30 px-3 py-2.5 text-sm text-slate-300 hover:bg-cyan-400/5"
          >
            <TrendingUp className="h-4 w-4 text-cyan-300" />
            Manage your spot
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
