"use client"

import { useRef, useState } from "react"
import { ImagePlus, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowUpRight, Eye } from "lucide-react"
import { getSpot } from "@/lib/body-spots"
import type { AdSpot } from "@/lib/types"

export interface Bid {
  brandName: string
  brandLogoUrl?: string
  brandUrl?: string
  price: number
}

function BidForm({
  spot,
  onBid,
  onOpenChange,
}: {
  spot: AdSpot
  onBid: (id: string, bid: Bid) => void
  onOpenChange: (open: boolean) => void
}) {
  const def = getSpot(spot.id)
  const [brandName, setBrandName] = useState(spot.brandName ?? "")
  const [brandUrl, setBrandUrl] = useState(spot.brandUrl ?? "")
  const [logoUrl, setLogoUrl] = useState(spot.brandLogoUrl ?? "")
  const [bid, setBid] = useState(() =>
    String(spot.status === "taken" ? Math.round(spot.price * 1.15) : spot.price),
  )
  const fileRef = useRef<HTMLInputElement>(null)

  const minBid = spot.status === "taken" ? spot.price + 100 : spot.price
  const bidValue = Number(bid) || 0
  const valid = brandName.trim().length > 0 && bidValue >= minBid

  const handleFile = (file?: File) => {
    if (!file) return
    setLogoUrl(URL.createObjectURL(file))
  }

  const submit = () => {
    if (!valid) return
    onBid(spot.id, {
      brandName: brandName.trim(),
      brandLogoUrl: logoUrl || undefined,
      brandUrl: brandUrl.trim() || undefined,
      price: bidValue,
    })
    onOpenChange(false)
  }

  return (
    <>
      <div className="mt-1 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="brand-name">Brand name</Label>
          <Input
            id="brand-name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="AadiBioN"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Logo</Label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/[0.02] text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-cyan-300"
            >
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="logo" className="h-full w-full object-contain" />
              ) : (
                <ImagePlus className="h-5 w-5" />
              )}
            </button>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Input
                value={logoUrl.startsWith("blob:") ? "" : logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="Logo image URL"
              />
              {logoUrl && (
                <button
                  type="button"
                  onClick={() => setLogoUrl("")}
                  className="inline-flex w-fit items-center gap-1 text-xs text-slate-500 hover:text-red-300"
                >
                  <X className="h-3 w-3" /> Remove logo
                </button>
              )}
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="brand-url">Website (optional)</Label>
          <Input
            id="brand-url"
            value={brandUrl}
            onChange={(e) => setBrandUrl(e.target.value)}
            placeholder="https://yourbrand.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="bid">Your bid (USD)</Label>
          <Input
            id="bid"
            type="number"
            min={minBid}
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            className="font-mono"
          />
          <span className="text-[11px] text-slate-500">
            Minimum ${minBid.toLocaleString()} · highest bid takes the spot.
          </span>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <Button
          size="lg"
          disabled={!valid}
          className="h-12 w-full justify-between bg-cyan-300 text-sm font-semibold text-slate-950 hover:bg-cyan-200"
          onClick={submit}
        >
          <span>
            {spot.status === "available" ? "Take over for" : "Outbid for"} $
            {bidValue.toLocaleString()}
          </span>
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        <p className="text-center text-[11px] leading-relaxed text-slate-500">
          Your logo will be placed on the fly&apos;s {def?.label.toLowerCase()}.
        </p>
      </div>
    </>
  )
}

export function SpotAdDialog({
  spot,
  open,
  onOpenChange,
  onBid,
}: {
  avatarName?: string
  spot?: AdSpot
  open: boolean
  onOpenChange: (open: boolean) => void
  onBid?: (id: string, bid: Bid) => void
}) {
  const def = spot ? getSpot(spot.id) : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm border-cyan-400/20 bg-slate-950/95 backdrop-blur-xl">
        {spot && def && (
          <>
            <DialogHeader>
              <div className="flex items-start justify-between gap-4">
                <DialogTitle className="text-lg text-white">
                  {def.label}
                  <span className="ml-2 inline-flex items-center gap-1 text-sm font-normal text-slate-400">
                    <Eye className="h-3.5 w-3.5 text-cyan-300" />
                    {(spot.views || 0).toLocaleString()} views
                  </span>
                </DialogTitle>
              </div>
              <DialogDescription className="pt-1 text-slate-400">
                {def.hint}
                {spot.brandName ? (
                  <span className="mt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                      {spot.brandLogoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={spot.brandLogoUrl}
                          alt=""
                          className="h-4 w-4 rounded object-contain"
                        />
                      )}
                      Current · {spot.brandName} · ${spot.price.toLocaleString()}
                    </span>
                  </span>
                ) : (
                  <span className="mt-2 block text-xs text-cyan-200/70">
                    ${spot.price.toLocaleString()} opening bid
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>

            <BidForm
              key={spot.id}
              spot={spot}
              onBid={onBid ?? (() => {})}
              onOpenChange={onOpenChange}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
