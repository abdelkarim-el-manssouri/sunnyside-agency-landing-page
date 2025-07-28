import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Diamond geometry component
function Diamond({ mousePosition }) {
  const meshRef = useRef()
  
  // Create realistic diamond geometry
  const diamondGeometry = React.useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    
    // Define diamond proportions (like a real cut diamond)
    const crownHeight = 0.5
    const pavilionHeight = 0.8
    const tableRadius = 0.3
    const girdleRadius = 0.6
    const cuspRadius = 0.1
    
    const vertices = []
    const indices = []
    const segments = 8
    
    // Table (top flat surface)
    vertices.push(0, crownHeight, 0) // Center top vertex (index 0)
    
    // Table edge vertices
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      vertices.push(
        Math.cos(angle) * tableRadius,
        crownHeight,
        Math.sin(angle) * tableRadius
      )
    }
    
    // Girdle vertices (widest part)
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      vertices.push(
        Math.cos(angle) * girdleRadius,
        0,
        Math.sin(angle) * girdleRadius
      )
    }
    
    // Cusp (bottom point)
    vertices.push(0, -pavilionHeight, 0) // Bottom vertex
    
    // Create faces
    // Table to crown faces
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments
      indices.push(0, i + 1, next + 1) // Table center to table edge
    }
    
    // Crown faces (table edge to girdle)
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments
      const tableIdx = i + 1
      const nextTableIdx = next + 1
      const girdleIdx = i + segments + 1
      const nextGirdleIdx = next + segments + 1
      
      indices.push(tableIdx, girdleIdx, nextTableIdx)
      indices.push(nextTableIdx, girdleIdx, nextGirdleIdx)
    }
    
    // Pavilion faces (girdle to cusp)
    const cuspIdx = vertices.length / 3 - 1
    for (let i = 0; i < segments; i++) {
      const next = (i + 1) % segments
      const girdleIdx = i + segments + 1
      const nextGirdleIdx = next + segments + 1
      
      indices.push(girdleIdx, cuspIdx, nextGirdleIdx)
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    geometry.setIndex(indices)
    geometry.computeVertexNormals()
    
    return geometry
  }, [])

  // Animate the diamond
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Follow mouse position with smooth interpolation
      const targetX = mousePosition.x * 2.5
      const targetY = -mousePosition.y * 2.5
      
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.1
      
      // Rotate the diamond
      meshRef.current.rotation.x += delta * 0.3
      meshRef.current.rotation.y += delta * 0.5
      
      // Add subtle floating animation
      meshRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
      
      // Scale pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      meshRef.current.scale.setScalar(scale)
    }
  })

  return (
    <mesh ref={meshRef} geometry={diamondGeometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.05}
        roughness={0.05}
        transmission={0.95}
        thickness={0.8}
        ior={2.42}
        clearcoat={1}
        clearcoatRoughness={0.01}
        envMapIntensity={1.5}
        reflectivity={1}
      />
    </mesh>
  )
}

// Sparkle particles around the diamond
function Sparkles() {
  const sparkleRef = useRef()
  const particleCount = 50
  
  const particles = React.useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      // Random positions around the diamond
      positions[i * 3] = (Math.random() - 0.5) * 8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8
      
      // Random colors (mainly white and blue)
      const colorChoice = Math.random()
      if (colorChoice < 0.7) {
        colors[i * 3] = 1     // R
        colors[i * 3 + 1] = 1 // G
        colors[i * 3 + 2] = 1 // B
      } else {
        colors[i * 3] = 0.5   // R
        colors[i * 3 + 1] = 0.8 // G
        colors[i * 3 + 2] = 1   // B
      }
    }
    
    return { positions, colors }
  }, [])
  
  useFrame((state) => {
    if (sparkleRef.current) {
      sparkleRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <points ref={sparkleRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// Main 3D Diamond component
function Diamond3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-full h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 overflow-hidden">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
        {/* Lighting setup for realistic diamond rendering */}
        <ambientLight intensity={0.2} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[2, 2, 2]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-2, -2, -2]} intensity={0.5} color="#4f46e5" />
        <spotLight
          position={[0, 5, 0]}
          angle={0.6}
          penumbra={1}
          intensity={0.8}
          castShadow
          color="#ffffff"
        />
        
        {/* Environment */}
        <Sparkles />
        
        {/* Diamond */}
        <Diamond mousePosition={mousePosition} />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10 pointer-events-none">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
          3D Diamond
        </h1>
        <p className="text-sm opacity-80 mb-1">✨ Move your cursor to control the diamond!</p>
        <p className="text-xs opacity-60">🖱️ Scroll to zoom • Drag to rotate view</p>
      </div>
      
      {/* Cursor position indicator */}
      <div className="absolute top-4 right-4 text-white z-10 text-xs opacity-60 pointer-events-none">
        <div>X: {mousePosition.x.toFixed(2)}</div>
        <div>Y: {mousePosition.y.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default Diamond3D