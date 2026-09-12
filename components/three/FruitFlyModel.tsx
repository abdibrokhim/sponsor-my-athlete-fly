"use client"

import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Box3, Color, Mesh, MeshStandardMaterial, Vector3 } from "three"
import type { Group } from "three"

const TARGET_HEIGHT = 1.9
const BODY_COLOR = "#c8a05a"

/**
 * Loads the fruit-fly character, computes smooth normals (the asset ships
 * without them), gives it a shaded material and normalizes it so it stands
 * ~1.9 units tall with its feet at y=0 and centered on the origin.
 */
export function FruitFlyModel({
  modelUrl,
  autoRotate = false,
  animate = false,
}: {
  modelUrl?: string
  autoRotate?: boolean
  animate?: boolean
}) {
  const { scene } = useGLTF(modelUrl ?? "/fruit-fly.glb")
  const spin = useRef<Group>(null)
  const fit = useRef<Group>(null)

  useEffect(() => {
    const outer = fit.current
    if (!outer) return

    scene.traverse((child) => {
      const mesh = child as Mesh
      if (!mesh.isMesh) return
      if (!mesh.geometry.getAttribute("normal")) {
        mesh.geometry.computeVertexNormals()
      }
      mesh.material = new MeshStandardMaterial({
        color: new Color(BODY_COLOR),
        roughness: 0.55,
        metalness: 0.18,
      })
      mesh.castShadow = true
    })

    const box = new Box3().setFromObject(scene)
    const size = box.getSize(new Vector3())
    const scale = size.y > 0 ? TARGET_HEIGHT / size.y : 1
    outer.scale.setScalar(scale)

    const fitted = new Box3().setFromObject(outer)
    const center = fitted.getCenter(new Vector3())
    outer.position.set(-center.x, -fitted.min.y, -center.z)
  }, [scene])

  useFrame((_, delta) => {
    const g = spin.current
    if (!g) return
    if (autoRotate) g.rotation.y += delta * 0.6
    if (animate) g.position.y = Math.sin(Date.now() * 0.002) * 0.01
  })

  return (
    <group ref={spin}>
      <group ref={fit}>
        <primitive object={scene} />
      </group>
    </group>
  )
}

useGLTF.preload("/fruit-fly.glb")
