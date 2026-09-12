"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Grid, OrbitControls } from "@react-three/drei"
import { Suspense, useRef } from "react"
import type { Group } from "three"
import { FruitFlyModel } from "./FruitFlyModel"
import { BodySpotLayer } from "./BodySpotLayer"
import type { AdSpot } from "@/lib/types"

const CYAN = "#46d5ff"

function Turntable({
  paused,
  children,
}: {
  paused?: boolean
  children: React.ReactNode
}) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    const g = ref.current
    if (!g || paused) return
    g.rotation.y += delta * 0.45
  })
  return <group ref={ref}>{children}</group>
}

function Pedestal() {
  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.15, 64]} />
        <meshStandardMaterial color="#060a12" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.05, 1.12, 64]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.006, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.48, 64]} />
        <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

function NeonFrame() {
  const wallProps = {
    color: CYAN,
    toneMapped: false,
    transparent: true,
    opacity: 0.28,
    roughness: 0.2,
    metalness: 0.4,
  } as const
  const frameMat = (
    <meshBasicMaterial color={CYAN} toneMapped={false} transparent opacity={0.7} />
  )

  return (
    <group>
      {/* back wall */}
      <mesh position={[0, 1.4, -3.4]}>
        <boxGeometry args={[5.4, 2.8, 0.02]} />
        <meshStandardMaterial {...wallProps} />
      </mesh>
      {/* left wall */}
      <mesh position={[-2.6, 1.4, -0.2]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.6, 2.8, 0.02]} />
        <meshStandardMaterial {...wallProps} />
      </mesh>
      {/* right wall */}
      <mesh position={[2.6, 1.4, -0.2]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[5.6, 2.8, 0.02]} />
        <meshStandardMaterial {...wallProps} />
      </mesh>
      {/* corner pillars */}
      {[
        [-2.6, 2.82],
        [2.6, 2.82],
        [-2.6, -0.02],
        [2.6, -0.02],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, -3.4]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          {frameMat}
        </mesh>
      ))}
    </group>
  )
}

function SceneContents({
  modelUrl,
  spots,
  selectedSpot,
  onSelect,
  interactive,
  paused,
}: {
  modelUrl?: string
  spots: AdSpot[]
  selectedSpot?: string
  onSelect: (spotId: string) => void
  interactive: boolean
  paused: boolean
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} />
      <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#7cc4ff" />
      <pointLight position={[0, 2.4, 2]} intensity={0.5} color={CYAN} />
      <hemisphereLight intensity={0.25} color="#cfe9ff" groundColor="#0b1020" />

      <Turntable paused={paused}>
        <Suspense fallback={null}>
          <FruitFlyModel modelUrl={modelUrl} />
        </Suspense>
        {interactive && (
          <BodySpotLayer spots={spots} selectedSpot={selectedSpot} onSelect={onSelect} />
        )}
      </Turntable>

      <Pedestal />
      <NeonFrame />
      <Grid
        position={[0, 0.001, 0]}
        args={[30, 30]}
        cellSize={0.9}
        cellThickness={0.6}
        cellColor="#12324a"
        sectionSize={4.5}
        sectionThickness={1.1}
        sectionColor={CYAN}
        fadeDistance={22}
        fadeStrength={1}
      />
      <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={6} blur={2.8} far={3} />
    </>
  )
}

export function ViewerScene({
  modelUrl,
  spots,
  selectedSpot,
  onSelect,
  autoRotate = true,
  interactive = true,
  cameraPosition = [0, 1.2, 4.9] as [number, number, number],
  targetY = 1.0,
  className,
}: {
  modelUrl?: string
  spots: AdSpot[]
  selectedSpot?: string
  onSelect?: (spotId: string) => void
  autoRotate?: boolean
  interactive?: boolean
  cameraPosition?: [number, number, number]
  targetY?: number
  className?: string
}) {
  const handleSelect = onSelect ?? (() => {})

  return (
    <div className={className}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContents
          modelUrl={modelUrl}
          spots={spots}
          selectedSpot={selectedSpot}
          onSelect={handleSelect}
          interactive={interactive}
          paused={!autoRotate || !!selectedSpot}
        />
        <OrbitControls
          enabled={interactive}
          target={[0, targetY, 0]}
          enablePan={false}
          enableZoom
          minDistance={3.2}
          maxDistance={8}
          minPolarAngle={0.9}
          maxPolarAngle={1.45}
          rotateSpeed={0.7}
          makeDefault
        />
      </Canvas>
    </div>
  )
}
