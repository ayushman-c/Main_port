import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import FloatingGeometry from './FloatingGeometry'

/**
 * Minimal Three.js scene for the Hero section.
 * Uses alpha canvas, no background — integrates with CSS background.
 */
export default function HeroScene() {
  const [hasWebGL, setHasWebGL] = useState(true)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setHasWebGL(false)
    } catch (e) {
      setHasWebGL(false)
    }
  }, [])

  if (!hasWebGL) return null

  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]}   intensity={1.2} />
        <directionalLight position={[-5, -3, 2]}  intensity={0.4} color="#a78bfa" />
        <pointLight       position={[0, 2, 3]}    intensity={0.8} color="#ffffff" />
        <FloatingGeometry />
      </Suspense>
    </Canvas>
  )
}
