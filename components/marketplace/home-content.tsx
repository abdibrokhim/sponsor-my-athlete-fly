"use client"

import { SiteHeader } from "@/components/site-header"
import { BodyHud } from "@/components/body-hud"
import { FLY } from "@/lib/fly"

export function HomeContent() {
  return (
    <div className="min-h-screen hud-bg">
      <SiteHeader />

      {/* Hero viewer — the one and only fruit fly, front and center */}
      <section id="sponsor" className="relative h-[86vh] w-full overflow-hidden">
        <BodyHud avatar={FLY} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 hud-grid" />
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            How the auction works
          </h2>
          <p className="pt-1 text-sm text-slate-400">
            One fly. Fourteen spots. Brands bid to put their logo on it.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Pick a spot",
              body: "Wings, compound eyes, thorax, abdomen, thighs and more. Every part of the fly is ad space.",
            },
            {
              step: "02",
              title: "Place your bid",
              body: "Name your price and upload your logo. Outbid the current sponsor to take the spot.",
            },
            {
              step: "03",
              title: "Wear the logo",
              body: "Winning logos render right on the fly as it rotates in the 3D viewer. Highest bid wins.",
            },
          ].map((c) => (
            <div key={c.step} className="rounded-2xl panel p-6">
              <div className="font-mono text-sm text-cyan-300/80">{c.step}</div>
              <div className="pt-2 text-lg font-semibold text-white">{c.title}</div>
              <p className="pt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
