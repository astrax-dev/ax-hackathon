// #genai
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const SETTINGS = {
  particleCount: 500,
  connectionDistance: 40,
  camera: {
    fov: 75,
    near: 1,
    far: 1000,
    position: { x: 0, y: 100, z: 300 },
  },
  scroll: {
    cameraZShift: 90,
    cameraYShift: 40,
    speedBoost: 1.2,
    ease: 0.06,
  },
  fog: { color: 0x05070a, density: 0.002 },
  particle: { color: 0x4a9eff, size: 2, opacity: 0.6 },
  line: { color: 0x4a9eff, opacity: 0.1 },
  maxFps: 30,
}

export default function ThreeBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(SETTINGS.fog.color, SETTINGS.fog.density)

    const camera = new THREE.PerspectiveCamera(
      SETTINGS.camera.fov,
      container.clientWidth / container.clientHeight,
      SETTINGS.camera.near,
      SETTINGS.camera.far,
    )
    camera.position.set(
      SETTINGS.camera.position.x,
      SETTINGS.camera.position.y,
      SETTINGS.camera.position.z,
    )
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.domElement.className = 'three-canvas'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    container.appendChild(renderer.domElement)

    const particleData = []
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(SETTINGS.particleCount * 3)

    for (let i = 0; i < SETTINGS.particleCount; i += 1) {
      particleData.push({
        angle: Math.random() * Math.PI * 2,
        radius: 80 + Math.random() * 40,
        speed: 0.2 + Math.random() * 0.5,
        yPos: Math.random() * 600 - 300,
      })
      particlePositions[i * 3] = 0
      particlePositions[i * 3 + 1] = 0
      particlePositions[i * 3 + 2] = 0
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.attributes.position.setUsage(THREE.DynamicDrawUsage)
    const particleMaterial = new THREE.PointsMaterial({
      color: SETTINGS.particle.color,
      size: SETTINGS.particle.size,
      transparent: true,
      opacity: SETTINGS.particle.opacity,
      blending: THREE.AdditiveBlending,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const maxSegments = (SETTINGS.particleCount * (SETTINGS.particleCount - 1)) / 2
    const linePositions = new Float32Array(maxSegments * 6)
    const lineGeometry = new THREE.BufferGeometry()
    const linePositionAttr = new THREE.BufferAttribute(linePositions, 3)
    linePositionAttr.setUsage(THREE.DynamicDrawUsage)
    lineGeometry.setAttribute('position', linePositionAttr)
    lineGeometry.setDrawRange(0, 0)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: SETTINGS.line.color,
      opacity: SETTINGS.line.opacity,
      transparent: true,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    let rafId = null
    let lastFrameTime = 0
    const frameInterval = 1000 / SETTINGS.maxFps
    const baseCameraY = SETTINGS.camera.position.y
    const baseCameraZ = SETTINGS.camera.position.z
    let scrollTarget = 0
    let scrollCurrent = 0

    const animate = (time) => {
      rafId = requestAnimationFrame(animate)
      if (time - lastFrameTime < frameInterval) return
      lastFrameTime = time

      const positions = particleGeometry.attributes.position.array
      let lineIndex = 0
      scrollCurrent += (scrollTarget - scrollCurrent) * SETTINGS.scroll.ease
      const speedMultiplier = 0.6 + scrollCurrent * SETTINGS.scroll.speedBoost

      for (let i = 0; i < SETTINGS.particleCount; i += 1) {
        const data = particleData[i]

        data.yPos -= data.speed * speedMultiplier
        data.angle += 0.005
        if (data.yPos < -300) data.yPos = 300

        const x = Math.cos(data.angle) * data.radius
        const y = data.yPos
        const z = Math.sin(data.angle) * data.radius

        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        for (let j = i + 1; j < SETTINGS.particleCount; j += 1) {
          const dx = x - positions[j * 3]
          const dy = y - positions[j * 3 + 1]
          const dz = z - positions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < SETTINGS.connectionDistance) {
            linePositions[lineIndex] = x
            linePositions[lineIndex + 1] = y
            linePositions[lineIndex + 2] = z
            linePositions[lineIndex + 3] = positions[j * 3]
            linePositions[lineIndex + 4] = positions[j * 3 + 1]
            linePositions[lineIndex + 5] = positions[j * 3 + 2]
            lineIndex += 6
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true
      lineGeometry.setDrawRange(0, lineIndex / 3)
      lineGeometry.attributes.position.needsUpdate = true

      camera.position.y =
        baseCameraY +
        Math.sin(time * 0.0005) * 20 +
        scrollCurrent * SETTINGS.scroll.cameraYShift
      camera.position.z = baseCameraZ - scrollCurrent * SETTINGS.scroll.cameraZShift
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    const updateScrollTarget = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      scrollTarget = Math.min(1, window.scrollY / maxScroll)
    }

    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', updateScrollTarget, { passive: true })
    updateScrollTarget()
    rafId = requestAnimationFrame(animate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', updateScrollTarget)
      particleGeometry.dispose()
      particleMaterial.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={containerRef} className="three-background" aria-hidden="true" />
}
