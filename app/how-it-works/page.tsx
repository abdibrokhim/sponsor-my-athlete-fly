import { SiteHeader } from "@/components/site-header"
import Link from "next/link"

export default function HowItWorks() {
  return (
    <div className="min-h-screen hud-bg">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          How it works
        </h1>
        <p className="pt-3 text-slate-400">
          Ad on my body is an auction for space on a very swole fruit fly. Brands
          bid on a spot, upload a logo, and the winning logo rides on the fly in
          the 3D viewer.
        </p>

        <div className="mt-10 flex flex-col gap-6">
          {[
            {
              step: "01",
              title: "Browse the fly",
              body: "Every part of the fly is ad space — wings, compound eyes, thorax, abdomen, thighs and more. Hover a marker to see the spot.",
            },
            {
              step: "02",
              title: "Place your bid",
              body: "Pick a spot, name your price and upload your logo. Outbid the current sponsor and the spot is yours.",
            },
            {
              step: "03",
              title: "See your logo on the fly",
              body: "Winning logos render onto the fly as it rotates. The biggest bids take the wings and the thorax front and center.",
            },
          ].map((c) => (
            <div key={c.step} className="flex gap-4 rounded-2xl panel p-6">
              <div className="font-mono text-lg text-cyan-300/80">{c.step}</div>
              <div>
                <div className="text-lg font-semibold text-white">{c.title}</div>
                <p className="pt-2 text-sm leading-relaxed text-slate-400">{c.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3">
          <Link
            href="/#sponsor"
            className="rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-5 py-2.5 text-sm font-medium text-cyan-100 transition-all hover:bg-cyan-400/20"
          >
            Place a bid
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition-colors hover:text-white"
          >
            Back to the fly
          </Link>
        </div>
      </div>
    </div>
  )
}
