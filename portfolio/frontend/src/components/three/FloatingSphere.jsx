import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

/**
 * Animated distorted sphere for the Hero background.
 */
function FloatingSphere({ position = [0, 0, 0], color = '#6366f1', speed = 1 }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.3
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  )
}

export default FloatingSphere
