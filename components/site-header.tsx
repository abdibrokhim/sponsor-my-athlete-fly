"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Gavel } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10">
              <span className="text-cyan-300">✦</span>
            </span>
            <span className="font-mono text-sm font-semibold tracking-tight text-white">
              Ad <span className="text-cyan-300">on</span> my body
            </span>
          </div>
          <nav className="hidden items-center gap-1 text-sm text-slate-300 sm:flex">
            <Link
              href="/"
              className={`rounded-lg px-3 py-1.5 transition-colors ${
                pathname === "/" ? "bg-white/5 text-white" : "hover:text-white"
              }`}
            >
              The fly
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-lg px-3 py-1.5 transition-colors hover:text-white"
            >
              How it works
            </Link>
          </nav>
        </div>

        <Link
          href="/#sponsor"
          className="flex items-center gap-1.5 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition-all hover:bg-cyan-400/20"
        >
          <Gavel className="h-4 w-4" />
          Place a bid
        </Link>
      </div>
    </header>
  )
}
