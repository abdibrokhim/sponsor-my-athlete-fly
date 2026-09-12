"use client"

import { useMemo, useRef } from "react"
import { Html } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { Quaternion, Vector3 } from "three"
import type { Group } from "three"
import { getSpot } from "@/lib/body-spots"
import type { AdSpot } from "@/lib/types"

const VIEW_NORMALS: Record<string, [number, number, number]> = {
  front: [0, 0, 1],
  back: [0, 0, -1],
  left: [-1, 0, 0],
  right: [1, 0, 0],
}

interface SpotMarkerProps {
  spot: AdSpot
  selected?: boolean
  onSelect: (spotId: string) => void
}

function SpotMarker({ spot, selected, onSelect }: SpotMarkerProps) {
  const groupRef = useRef<Group>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const camera = useThree((s) => s.camera)

  const spotDef = getSpot(spot.id)
  const normal = useMemo(
    () => new Vector3(...(VIEW_NORMALS[spotDef?.view ?? "front"] ?? [0, 0, 1])),
    [spotDef?.view],
  )
  const worldPos = useMemo(() => new Vector3(), [])
  const camDir = useMemo(() => new Vector3(), [])
  const q = useMemo(() => new Quaternion(), [])

  useFrame(() => {
    const g = groupRef.current
    const el = innerRef.current
    if (!g || !el) return

    g.getWorldPosition(worldPos)
    const worldNormal = normal.clone().applyQuaternion(g.getWorldQuaternion(q))
    camDir.copy(camera.position).sub(worldPos).normalize()
    const facing = worldNormal.dot(camDir) > -0.18

    el.style.opacity = facing ? "1" : "0"
    el.style.pointerEvents = facing ? "auto" : "none"
  })

  const taken = spot.status !== "available"

  return (
    <group position={spotDef?.position ?? [0, 1.3, 0]}>
      <group ref={groupRef}>
        <Html center zIndexRange={[30, 0]}>
          <div
            ref={innerRef}
            className="relative transition-opacity duration-150"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(spot.id)
            }}
          >
            {taken ? (
              <button
                type="button"
                className={`flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg backdrop-blur transition-all hover:scale-110 ${
                  selected
                    ? "border-cyan-300 ring-2 ring-cyan-400/60"
                    : "border-white/20"
                }`}
                style={{ background: "rgba(10,14,22,0.72)" }}
              >
                {spot.brandLogoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={spot.brandLogoUrl}
                    alt={spot.brandName ?? "sponsor"}
                    className="h-8 w-8 rounded-md object-contain"
                  />
                ) : (
                  <span className="text-xs font-semibold text-white/80">
                    {spot.brandName ?? "Brand"}
                  </span>
                )}
              </button>
            ) : (
              <button
                type="button"
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all hover:scale-110 ${
                  selected
                    ? "border-cyan-300 bg-cyan-400/20 ring-2 ring-cyan-400/50"
                    : "border-white/15 bg-slate-900/60"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white/80"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14M5 12h14"
                  />
                </svg>
              </button>
            )}
          </div>
        </Html>
      </group>
    </group>
  )
}

export function BodySpotLayer({
  spots,
  selectedSpot,
  onSelect,
}: {
  spots: AdSpot[]
  selectedSpot?: string
  onSelect: (spotId: string) => void
}) {
  return (
    <>
      {spots.map((spot) => (
        <SpotMarker
          key={spot.id}
          spot={spot}
          selected={selectedSpot === spot.id}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}
