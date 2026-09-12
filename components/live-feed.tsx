"use client"

import { useEffect, useState } from "react"

const COUNTRIES = ["France", "Portugal", "India", "United Kingdom", "Estonia"]

function randomCountry() {
  return COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)]
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

interface Row {
  id: number
  country: string
  time: string
}

export function LiveFeed({ baseViews }: { baseViews: number }) {
  const [views, setViews] = useState(baseViews)
  // Empty on the server/first render to avoid hydration mismatches, then
  // populated on the client by the interval below.
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    const tock = () =>
      setRows((prev) => {
        const now = new Date()
        const time = `${now.getHours()}:${String(now.getMinutes()).padStart(
          2,
          "0",
        )}:${String(now.getSeconds()).padStart(2, "0")}`
        if (Math.random() < 0.4) setViews((v) => v + randInt(1, 6))
        return [{ id: Date.now(), country: randomCountry(), time }, ...prev].slice(0, 4)
      })
    tock()
    const id = setInterval(tock, 4000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col gap-3 font-mono text-xs text-slate-300">
      <div className="text-cyan-glow text-lg font-semibold tabular-nums">
        {views.toLocaleString()}{" "}
        <span className="pl-1 text-xs font-normal text-slate-400">watched today</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {rows.map((r) => (
          <div key={r.id} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-400/80" />
              {r.country}
            </div>
            <span className="text-slate-500 tabular-nums">{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
