import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * Floating distorted icosahedron that reacts to mouse position.
 */
export default function FloatingGeometry() {
  const meshRef  = useRef()
  const { mouse } = useThree()

  const targetRotation = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // Float up and down
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15

    // Smooth mouse-driven rotation
    targetRotation.current.x = mouse.y * -0.3
    targetRotation.current.y = mouse.x *  0.5

    meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05
    meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05

    // Slow auto-rotate
    meshRef.current.rotation.z = t * 0.1
  })

  return (
    <mesh ref={meshRef} scale={1.4}>
      <icosahedronGeometry args={[1, 4]} />
      <MeshDistortMaterial
        color="#ffffff"
        attach="material"
        distort={0.25}
        speed={1.5}
        roughness={0.1}
        metalness={0.8}
        wireframe={false}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}
