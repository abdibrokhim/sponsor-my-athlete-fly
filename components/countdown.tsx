"use client"

import { useEffect, useState } from "react"

interface Blocks {
  d: number
  h: number
  m: number
  s: number
}

function diff(target: number): Blocks {
  const now = Date.now()
  const delta = Math.max(0, target - now)
  const s = Math.floor(delta / 1000)
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  }
}

export function Countdown({ target }: { target: number }) {
  const [t, setT] = useState<Blocks>(() => diff(target))

  useEffect(() => {
    const id = setInterval(() => setT(diff(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const items: Array<{ k: keyof Blocks; v: number }> = [
    { k: "d", v: t.d },
    { k: "h", v: t.h },
    { k: "m", v: t.m },
    { k: "s", v: t.s },
  ]

  return (
    <div className="flex items-center gap-3 font-mono text-cyan-glow">
      {items.map((it, i) => (
        <div key={it.k} className="flex items-center gap-3">
          <div className="text-2xl font-semibold tabular-nums">
            {String(it.v).padStart(2, "0")}
          </div>
          {i < items.length - 1 && <span className="opacity-40">:</span>}
        </div>
      ))}
    </div>
  )
}

export function nextRaceDate(): number {
  const now = new Date()
  const target = new Date(now)
  target.setDate(target.getDate() + 2)
  target.setHours(21, 0, 0, 0)
  return target.getTime()
}
