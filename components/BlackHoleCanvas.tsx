'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Mappings for optimized execution
const An = THREE.Scene
const Hc = THREE.WebGLRenderer
const $i = THREE.PerspectiveCamera
const $c = OrbitControls
const wr = THREE.BufferGeometry
const lr = THREE.BufferAttribute
const Z = THREE.Color
const J = THREE.Vector3
const Ei = THREE.ShaderMaterial
const ui = THREE.Points
const xa = THREE.Clock
const va = THREE.Raycaster
const q = THREE.Vector2
const ei = THREE.Plane

// Configuration defaults representing our Relativistic Black Hole
const DEFAULTS = {
  particleCount: 35000,
  colorSaturation: 1.0,
  scatterTop: 1.0,
  scatterBottom: 0.15,
  shrinkSpeed: 12.0,
  entranceDelayMs: 300,
  entranceGrowSpeed: 0.8,
  entranceLingerSeconds: 1.0,
  eventHorizonRadius: 32.0,
  accretionDiskRadius: 140.0,
  gravityLensing: 1.4,
  dopplerIntensity: 1.3,
  orbitalSpeed: 0.9,
  coreGreenColor: '#8b5cf6', // Accretion Disk (Zavorth Deep Violet)
  coreYellowColor: '#06b6d4', // Core Accretion Dust (Zavorth Cyan Glow)
  coreRedColor: '#ec4899', // Redshifted Gas (Zavorth Electric Fuchsia)
  coreBlueColor: '#e2f8ff', // Blueshifted Gas (Zavorth Ice White-Hot)
  autoReturnToFront: true,
  autoReturnForce: 0.15,
  autoReturnForceDecay: 0.02
}

// Preset color palettes for click cycle
const PALETTES = [
  {
    coreGreenColor: '#8b5cf6',
    coreYellowColor: '#06b6d4',
    coreRedColor: '#ec4899',
    coreBlueColor: '#e2f8ff'
  },
  {
    coreGreenColor: '#06b6d4',
    coreYellowColor: '#ec4899',
    coreRedColor: '#8b5cf6',
    coreBlueColor: '#ffffff'
  },
  {
    coreGreenColor: '#a78bfa',
    coreYellowColor: '#22d3ee',
    coreRedColor: '#f472b6',
    coreBlueColor: '#e0f7fa'
  },
  {
    coreGreenColor: '#00f0ff',
    coreYellowColor: '#ff0055',
    coreRedColor: '#8b5cf6',
    coreBlueColor: '#fff5ea'
  },
  {
    coreGreenColor: '#ff5500',
    coreYellowColor: '#ffcc00',
    coreRedColor: '#bb2200',
    coreBlueColor: '#fff5ea'
  },
  {
    coreGreenColor: '#ff3300',
    coreYellowColor: '#ffff00',
    coreRedColor: '#ff00ff',
    coreBlueColor: '#ffaa00'
  },
  {
    coreGreenColor: '#0011bb',
    coreYellowColor: '#00ffcc',
    coreRedColor: '#9900ff',
    coreBlueColor: '#00ff55'
  },
  {
    coreGreenColor: '#0c0024',
    coreYellowColor: '#ff0055',
    coreRedColor: '#ff3300',
    coreBlueColor: '#00f0ff'
  }
]

export function BlackHoleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const container = containerRef.current
    let fl = { ...DEFAULTS }

    function ml(e: number, t: number, n: number) {
      let r = Math.max(0, Math.min(1, (n - e) / (t - e)))
      return r * r * (3 - 2 * r)
    }

    // Global simulation variables
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      controls: OrbitControls
    let particleGeometry: THREE.BufferGeometry, pointsObject: THREE.Points
    let f: Float32Array,
      p: Float32Array,
      m: Float32Array,
      h: Float32Array,
      g: Float32Array,
      _: Float32Array,
      v: Float32Array // Typed arrays for attributes
    let b: THREE.Color[],
      targetColors: THREE.Color[] = [] // Base and secondary colors
    let waves: { radius: number; stateIndex: number; width: number; speed: number }[] = []
    let raycaster: THREE.Raycaster,
      mouse2D: THREE.Vector2,
      projectionPlane: THREE.Plane
    let cameraTarget: THREE.Vector3, cameraLocalTarget: THREE.Vector3
    let isMouseActive = false
    let autoReturnTimer = 0.15
    let isUserDragging = false
    let hasScrolled = false
    let activeScale = false
    let lingerTime = 0
    let timeTracker = 0
    let clock = new xa()
    let currentPaletteIndex = 0

    // Physically opaque event horizon mesh
    let eventHorizonMesh: THREE.Mesh

    // Scroll animation physics tracking variables
    let scatterCurrent = fl.scatterTop
    let scatterTarget = fl.scatterTop
    let scrollRatioTarget = 0
    let scrollRatioCurrent = 0

    // 1. Scene setup
    scene = new An()

    // 2. WebGL Renderer
    renderer = new Hc({ antialias: false, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // 3. Camera
    camera = new $i(75, container.clientWidth / container.clientHeight, 0.1, 2000)
    camera.position.z = 240

    // 4. Orbit Controls
    controls = new $c(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.target.set(0, 35, 0) // Focus orbital rotation exactly on the active black hole center (y=35)

    const onControlsStart = () => {
      isUserDragging = true
      hasScrolled = true
      autoReturnTimer = fl.autoReturnForce
    }
    const onControlsEnd = () => {
      isUserDragging = false
    }

    controls.addEventListener('start', onControlsStart)
    controls.addEventListener('end', onControlsEnd)

    // 5. Black Hole Event Horizon sphere mesh
    const ehGeom = new THREE.SphereGeometry(fl.eventHorizonRadius * 0.95, 32, 32)
    const ehMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
    eventHorizonMesh = new THREE.Mesh(ehGeom, ehMat)
    eventHorizonMesh.position.y = 35 // Shifted up slightly to leave the screen center clear for the text title
    scene.add(eventHorizonMesh)

    // 5b. Radial Glow Halo around the Event Horizon (simulates light bending around the void)
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 512
    glowCanvas.height = 512
    const gctx = glowCanvas.getContext('2d')!
    const gradient = gctx.createRadialGradient(256, 256, 60, 256, 256, 256)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)')     // transparent core
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.0)')   // still transparent near center
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)')   // white glow ring starts (tinted by material)
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)')   // peak
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)')     // falloff
    gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.1)')   // outer haze
    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)')    // transparent edge
    gctx.fillStyle = gradient
    gctx.fillRect(0, 0, 512, 512)
    const glowTexture = new THREE.CanvasTexture(glowCanvas)
    const glowSpriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.85,
      color: new THREE.Color(fl.coreGreenColor)
    })
    const glowSprite = new THREE.Sprite(glowSpriteMat)
    glowSprite.scale.set(fl.eventHorizonRadius * 5.5, fl.eventHorizonRadius * 5.5, 1)
    glowSprite.position.y = 35
    scene.add(glowSprite)

    // 6. Particles definition
    let u = { count: fl.particleCount, size: 1.8 }
    particleGeometry = new wr()

    f = new Float32Array(u.count * 3) // Position array
    p = new Float32Array(u.count * 3) // Color array
    m = new Float32Array(u.count) // customSize array
    h = new Float32Array(u.count) // angles
    g = new Float32Array(u.count) // distance radii
    _ = new Float32Array(u.count) // vertical orbit height perturbation
    v = new Float32Array(u.count) // size scales

    let photonRingCount = Math.floor(u.count * 0.22)
    let jetCount = Math.floor(u.count * 0.10)
    let bgCount = Math.floor(u.count * 0.10)

    let jetStartIdx = photonRingCount
    let bgStartIdx = jetStartIdx + jetCount
    let diskStartIdx = bgStartIdx + bgCount

    for (let e = 0; e < u.count; e++) {
      if (e < photonRingCount) {
        h[e] = Math.random() * Math.PI * 2
        g[e] = fl.eventHorizonRadius * 1.005 + Math.random() * 5.0
        _[e] = (Math.random() - 0.5) * 0.6
        v[e] = 0.6 + Math.random() * 1.2
      } else if (e < bgStartIdx) {
        g[e] = Math.random() * 140.0
        _[e] = 1.0 + Math.random() * 3.5
        h[e] = Math.random() * Math.PI * 2
        v[e] = Math.random() > 0.5 ? 1.0 : -1.0
      } else if (e < diskStartIdx) {
        let radius = 180.0 + Math.random() * 150.0
        let theta = Math.random() * Math.PI * 2
        let phi = Math.acos(2.0 * Math.random() - 1.0)

        g[e] = radius
        h[e] = theta
        _[e] = phi
        v[e] = 0.6 + Math.random() * 1.5
      } else {
        let armIndex = e % 3
        let angleBase = armIndex * ((Math.PI * 2) / 3)

        let normRadius = Math.pow(Math.random(), 2.2)
        let r =
          fl.eventHorizonRadius * 1.1 +
          (fl.accretionDiskRadius - fl.eventHorizonRadius * 1.1) * normRadius

        g[e] = r
        h[e] = angleBase + r * 0.024 + (Math.random() - 0.5) * 0.32
        _[e] = (Math.random() + Math.random() - 1.0) * (2.5 + normRadius * 10.0)
        v[e] = 0.6 + Math.random() * 1.4
      }
    }

    particleGeometry.setAttribute('position', new lr(f, 3))
    particleGeometry.setAttribute('color', new lr(p, 3))
    particleGeometry.setAttribute('customSize', new lr(m, 1))

    // Setup colors
    const parseColor = (col: string) =>
      col.startsWith('#') || col.startsWith('rgb') ? col : '#' + col
    b = [
      new Z(parseColor(fl.coreGreenColor)),
      new Z(parseColor(fl.coreYellowColor)),
      new Z(parseColor(fl.coreRedColor)),
      new Z(parseColor(fl.coreBlueColor))
    ]

    targetColors = [b[0].clone(), b[1].clone(), b[2].clone(), b[3].clone()]

    const HSL = { h: 0, s: 0, l: 0 }
    for (let col of b) {
      col.getHSL(HSL)
      col.setHSL(HSL.h, HSL.s * fl.colorSaturation, HSL.l)
    }
    for (let col of targetColors) {
      col.getHSL(HSL)
      col.setHSL(HSL.h, HSL.s * fl.colorSaturation, HSL.l)
    }

    raycaster = new va()
    mouse2D = new q(-9999, -9999)
    projectionPlane = new ei(new J(0, 0, 1), 0)
    cameraTarget = new J()
    cameraLocalTarget = new J()

    // Custom depth shader
    const shaderMat = new Ei({
      uniforms: { uPixelRatio: { value: window.devicePixelRatio } },
      vertexColors: true,
      vertexShader: `
        attribute float customSize;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = customSize * uPixelRatio * (245.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float distSq = dot(coord, coord);
            
            // Smoothly fade out at the edges instead of using discard (which ruins GPU early-z and stalls rasterization)
            float borderFade = 1.0 - smoothstep(0.18, 0.25, distSq);
            
            float glow = exp(-distSq * 9.0);
            float core = smoothstep(0.08, 0.0, distSq) * 0.6;
            
            float alpha = (glow + core) * borderFade;
            vec3 boostedColor = vColor * 1.35 + vec3(0.04, 0.01, 0.06);
            gl_FragColor = vec4(boostedColor, alpha * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    pointsObject = new ui(particleGeometry, shaderMat)
    pointsObject.scale.set(0, 0, 0)
    pointsObject.position.y = 35 // Shifted up to align perfectly with the Event Horizon sphere
    pointsObject.visible = false
    scene.add(pointsObject)

    let activeScaleTimeout = setTimeout(() => {
      pointsObject.visible = true
      activeScale = true
    }, fl.entranceDelayMs)

    // Global Event Listeners inside useEffect
    const onScroll = () => {
      const heroEl = document.getElementById('hero')
      if (!heroEl) return

      const rect = heroEl.getBoundingClientRect()
      let progress = 0

      if (rect.top < 0) {
        let heightDiff = rect.height - window.innerHeight
        progress = heightDiff > 0 ? Math.min(1.0, -rect.top / heightDiff) : 1.0
      }

      scrollRatioTarget = progress
      let shrinkRatio = Math.min(1.0, progress * fl.shrinkSpeed)
      scatterTarget = fl.scatterTop - (fl.scatterTop - fl.scatterBottom) * shrinkRatio
    }

    const onPointerMove = (e: PointerEvent) => {
      mouse2D.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse2D.y = -(e.clientY / window.innerHeight) * 2 + 1
      isMouseActive = true
    }

    const onPointerLeave = () => {
      isMouseActive = false
      mouse2D.set(-9999, -9999)
    }

    const onPointerDown = () => {
      waves.push({
        radius: fl.eventHorizonRadius,
        stateIndex: 1,
        width: 60,
        speed: 680
      })

      currentPaletteIndex = (currentPaletteIndex + 1) % PALETTES.length
      const nextPalette = PALETTES[currentPaletteIndex]

      fl.coreGreenColor = nextPalette.coreGreenColor
      fl.coreYellowColor = nextPalette.coreYellowColor;
      fl.coreRedColor = nextPalette.coreRedColor;
      fl.coreBlueColor = nextPalette.coreBlueColor;

      const parseCol = (col: string) =>
        col.startsWith('#') || col.startsWith('rgb') ? col : '#' + col
      const localHSL = { h: 0, s: 0, l: 0 }

      const tempColors = [
        new Z(parseCol(fl.coreGreenColor)),
        new Z(parseCol(fl.coreYellowColor)),
        new Z(parseCol(fl.coreRedColor)),
        new Z(parseCol(fl.coreBlueColor))
      ]

      for (let k = 0; k < 4; k++) {
        tempColors[k].getHSL(localHSL)
        tempColors[k].setHSL(localHSL.h, localHSL.s * fl.colorSaturation, localHSL.l)
        targetColors[k].copy(tempColors[k])
      }
    }

    const onResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      shaderMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    container.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)

    // Reuse temporary variables to prevent garbage collection spikes in 60 FPS loop
    const tempColor = new Z()
    const normalVec = new J()
    const centerVec = new J(0, 35, 0)
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      let delta = clock.getDelta()

      for (let k = 0; k < 4; k++) {
        if (b[k] && targetColors[k]) {
          b[k].lerp(targetColors[k], delta * 4.0)
        }
      }

      if (glowSpriteMat && b[0]) {
        glowSpriteMat.color.copy(b[0])
      }

      if (activeScale && (lingerTime += delta, lingerTime > fl.entranceLingerSeconds)) {
        if (!hasScrolled) {
          timeTracker += delta
        }
      }

      scatterCurrent += (scatterTarget - scatterCurrent) * 0.1
      scrollRatioCurrent += (scrollRatioTarget - scrollRatioCurrent) * 0.1

      if (eventHorizonMesh) {
        let targetScale = 1.0 - scrollRatioCurrent * 0.3
        let depthScale = targetScale * (0.2 + 0.8 * scatterCurrent)
        eventHorizonMesh.scale.set(targetScale, targetScale, depthScale)
      }

      waves.forEach(w => (w.radius += delta * w.speed))
      while (waves.length > 0 && waves[0].radius >= fl.accretionDiskRadius * 1.5) {
        waves.shift()
      }

      pointsObject.updateMatrixWorld()

      if (isMouseActive && !isUserDragging) {
        camera.getWorldDirection(normalVec)
        normalVec.negate()
        projectionPlane.setFromNormalAndCoplanarPoint(normalVec, centerVec)

        raycaster.setFromCamera(mouse2D, camera)
        raycaster.ray.intersectPlane(projectionPlane, cameraTarget)
        cameraLocalTarget.copy(cameraTarget)
        pointsObject.worldToLocal(cameraLocalTarget)
      } else {
        cameraLocalTarget.set(-9999, -9999, -9999)
      }

      let posAttr = pointsObject.geometry.attributes.position as THREE.BufferAttribute
      let colAttr = pointsObject.geometry.attributes.color as THREE.BufferAttribute
      let sizeAttr = pointsObject.geometry.attributes.customSize as THREE.BufferAttribute

      let positions = posAttr.array as Float32Array
      let colors = colAttr.array as Float32Array
      let sizes = sizeAttr.array as Float32Array

      let count = fl.particleCount

      let inclination = 0.28 * scatterCurrent
      let cosIncl = Math.cos(inclination)
      let sinIncl = Math.sin(inclination)
      let activeLensing = fl.gravityLensing * scatterCurrent

      let inflowRate = 18.0 * fl.orbitalSpeed * (1.0 - scrollRatioCurrent * 0.95)
      let jetSpeed = 160.0 * fl.orbitalSpeed

      for (let i = 0; i < count; i++) {
        let idx3 = i * 3
        let scaleMult = 1.0
        let rChan = 0,
          gChan = 0,
          bChan = 0
        let attractionFactor = 0

        if (i < photonRingCount) {
          let baseRadius = g[i]
          let angleOffset = h[i]
          let omega = (fl.orbitalSpeed * 650) / (baseRadius * Math.sqrt(baseRadius))
          let currentAngle = angleOffset + timeTracker * omega

          let px = baseRadius * Math.cos(currentAngle)
          let py = baseRadius * Math.sin(currentAngle) * sinIncl
          let pz = baseRadius * Math.sin(currentAngle) * cosIncl

          px *= 0.3 + 0.7 * scatterCurrent
          py *= 0.3 + 0.7 * scatterCurrent
          pz *= 0.1 + 0.9 * scatterCurrent

          positions[idx3] = px
          positions[idx3 + 1] = py
          positions[idx3 + 2] = pz

          sizes[i] = v[i] * 1.4
          // Blend photon ring white core with the active secondary color b[1] to match the palette
          let ringColor = b && b[1] ? b[1] : new THREE.Color(0.8, 0.95, 1.0)
          rChan = 0.82 + ringColor.r * 0.18
          gChan = 0.82 + ringColor.g * 0.18
          bChan = 0.82 + ringColor.b * 0.18
        } else if (i < bgStartIdx) {
          let y_val = g[i]
          let initSpiralRadius = _[i]
          let angleBase = h[i]
          let direction = v[i]

          y_val += delta * jetSpeed * (1.0 + y_val * 0.006)
          if (y_val > 140) {
            y_val = 0.5 + Math.random() * 5.0
            angleBase = Math.random() * Math.PI * 2
            h[i] = angleBase
          }
          g[i] = y_val

          let jetSpin = angleBase + timeTracker * (direction * 14.0) + y_val * 0.12
          let coneRadius = initSpiralRadius + y_val * 0.08

          let px = coneRadius * Math.cos(jetSpin)
          let py = y_val * direction * scatterCurrent
          let pz = coneRadius * Math.sin(jetSpin)

          px += Math.sin(timeTracker * 8 + y_val * 0.1) * 1.5
          pz += Math.cos(timeTracker * 8 + y_val * 0.1) * 1.5

          positions[idx3] = px
          positions[idx3 + 1] = py
          positions[idx3 + 2] = pz

          let lifeRatio = Math.max(0, 1 - y_val / 140)
          // Relativistic jet energy pulse wave traveling outward along the Y axis
          let pulse = Math.sin(y_val * 0.12 - timeTracker * 10.0) * 0.35 + 0.65
          sizes[i] = (0.5 + lifeRatio * 1.5) * (0.8 + Math.random() * 0.5) * (0.6 + pulse * 0.8)

          let jetBaseColor = b[3]
          let jetTipColor = b[0]
          tempColor.copy(jetBaseColor).lerp(jetTipColor, 1 - lifeRatio)

          rChan = tempColor.r * lifeRatio * 0.9 * pulse
          gChan = tempColor.g * lifeRatio * 0.9 * pulse
          bChan = tempColor.b * lifeRatio * 0.9 * pulse
        } else if (i < diskStartIdx) {
          let radius = g[i]
          let theta = h[i]
          let phi = _[i]
          let sizeSeed = v[i]

          let bgSpin = theta + timeTracker * 0.015

          let px = radius * Math.cos(bgSpin) * Math.sin(phi)
          let py = radius * Math.sin(bgSpin) * Math.sin(phi)
          let pz = radius * Math.cos(phi)

          let rProjSq = px * px + py * py
          if (pz < 0 && activeLensing > 0) {
            let deflection = (fl.eventHorizonRadius * fl.eventHorizonRadius * 1.6) / (rProjSq + 0.1)
            px += px * deflection * activeLensing
            py += py * deflection * activeLensing
          }

          positions[idx3] = px
          positions[idx3 + 1] = py
          positions[idx3 + 2] = pz

          if (i % 6 === 0) {
            sizes[i] = sizeSeed * 18.0 * (0.5 + 0.5 * Math.sin(timeTracker * 0.5 + radius))
            let nebColor = b[0]
            rChan = nebColor.r * 0.08
            gChan = nebColor.g * 0.04
            bChan = nebColor.b * 0.15
          } else {
            // Stars tinted by current palette
            let paletteMix = (i * 0.13) % 1.0
            let starBase = paletteMix < 0.5 ? b[0] : b[3]
            let tintStrength = 0.25 + (paletteMix * 0.3)
            let starWhite = 0.6 + ((i * 0.17) % 0.3)

            rChan = starWhite * (1.0 - tintStrength) + starBase.r * tintStrength
            gChan = starWhite * (1.0 - tintStrength) + starBase.g * tintStrength
            bChan = starWhite * (1.0 - tintStrength) + starBase.b * tintStrength

            rChan *= 0.2 + 0.8 * scatterCurrent
            gChan *= 0.2 + 0.8 * scatterCurrent
            bChan *= 0.2 + 0.8 * scatterCurrent
          }
        } else {
          let baseRadius = g[i]
          let angleOffset = h[i]
          let diskZThickness = _[i]

          let baseRadSqrt = Math.sqrt(baseRadius)

          baseRadius -= delta * inflowRate * (30.0 / (baseRadSqrt + 0.1))
          if (baseRadius < fl.eventHorizonRadius * 1.05) {
            baseRadius =
              fl.eventHorizonRadius * 1.6 +
              Math.random() * (fl.accretionDiskRadius - fl.eventHorizonRadius * 1.6)
            angleOffset = Math.random() * Math.PI * 2
            h[i] = angleOffset
          }
          g[i] = baseRadius

          let omega = (fl.orbitalSpeed * 350) / (baseRadius * baseRadSqrt)
          let currentAngle = angleOffset + timeTracker * omega

          // Zavorth Custom Liquid Accretion Wave-Warp (autoral ripple physics)
          let helixWarp = Math.sin(baseRadius * 0.16 + timeTracker * 2.5) * 3.5 * (1.0 - scrollRatioCurrent)
          let turbulence = (Math.sin(baseRadius * 0.08 - timeTracker * 3.5) * 1.8 + helixWarp) * (1.0 - scrollRatioCurrent)

          let cosA = Math.cos(currentAngle)
          let sinA = Math.sin(currentAngle)

          let px = (baseRadius + turbulence) * cosA
          let py_flat = (baseRadius + turbulence) * sinA * sinIncl
          let pz_flat = (baseRadius + turbulence) * sinA * cosIncl

          let py = py_flat + (diskZThickness + helixWarp * 1.25) * sinIncl * scatterCurrent
          let pz = pz_flat + (diskZThickness + helixWarp * 1.25) * cosIncl * scatterCurrent

          if (pz < 0 && activeLensing > 0) {
            let rSq = px * px + py * py
            let deflection = (fl.eventHorizonRadius * fl.eventHorizonRadius) / (rSq + 0.1)
            py += Math.sign(py_flat) * deflection * 48 * activeLensing
          }

          px *= 0.3 + 0.7 * scatterCurrent
          py *= 0.3 + 0.7 * scatterCurrent
          pz *= 0.1 + 0.9 * scatterCurrent

          positions[idx3] = px
          positions[idx3 + 1] = py
          positions[idx3 + 2] = pz

          let distance = Math.sqrt(px * px + py * py + pz * pz)
          if (distance === 0) distance = 0.001

          let waveGlowBoost = 0.0
          for (let k = 0; k < waves.length; k++) {
            let w = waves[k]
            let wDist = Math.abs(distance - w.radius)
            if (wDist < w.width) {
              let innerFactor = 1 - wDist / w.width
              scaleMult = Math.max(scaleMult, 1 + innerFactor * 1.3)
              waveGlowBoost = Math.max(waveGlowBoost, innerFactor)
            }
          }

          if (isMouseActive) {
            let dx = px - cameraLocalTarget.x
            let dy = py - cameraLocalTarget.y
            let dz = pz - cameraLocalTarget.z
            let cursorDist = Math.sqrt(dx * dx + dy * dy + dz * dz)
            if (cursorDist < 75) {
              attractionFactor = 1 - ml(0, 1, cursorDist / 75)
              scaleMult = Math.max(scaleMult, 1 + attractionFactor * 0.7)
            }
          }

          // Accretion disk spiral arm filaments & clumping factor
          let filament = Math.sin(angleOffset * 5.0 + baseRadius * 0.08 - timeTracker * 4.5) * 0.22 + 0.78
          
          // Scale particle size based on spiral arm filament density to enhance structural layout
          sizes[i] = v[i] * (0.8 + (1.0 - Math.min(baseRadius / fl.accretionDiskRadius, 1)) * 1.5) * (0.8 + (filament - 0.78) * 0.8)

          let orbitalVelocityZ = -sinA * cosIncl * (40 / baseRadSqrt)
          let doppler = orbitalVelocityZ * 0.16 * fl.dopplerIntensity

          let normDist = Math.min(
            (baseRadius - fl.eventHorizonRadius) / (fl.accretionDiskRadius - fl.eventHorizonRadius),
            1
          )

          // Multi-layer temperature profile: white-hot inner edge, transition to yellow/cyan, then violet, fanning out to fuchsia/red
          if (normDist < 0.12) {
            let t = normDist / 0.12
            rChan = b[3].r + (b[1].r - b[3].r) * t
            gChan = b[3].g + (b[1].g - b[3].g) * t
            bChan = b[3].b + (b[1].b - b[3].b) * t
          } else if (normDist < 0.45) {
            let t = (normDist - 0.12) / (0.45 - 0.12)
            rChan = b[1].r + (b[0].r - b[1].r) * t
            gChan = b[1].g + (b[0].g - b[1].g) * t
            bChan = b[1].b + (b[0].b - b[1].b) * t
          } else if (normDist < 0.8) {
            let t = (normDist - 0.45) / (0.8 - 0.45)
            rChan = b[0].r + (b[2].r - b[0].r) * t
            gChan = b[0].g + (b[2].g - b[0].g) * t
            bChan = b[0].b + (b[2].b - b[0].b) * t
          } else {
            let t = (normDist - 0.8) / (1.0 - 0.8)
            rChan = b[2].r * (1.0 - t * 0.4)
            gChan = b[2].g * (1.0 - t * 0.4)
            bChan = b[2].b * (1.0 - t * 0.4)
          }

          // Apply spiral arm filaments brightness texture
          rChan *= filament
          gChan *= filament
          bChan *= filament

          tempColor.setRGB(rChan, gChan, bChan)

          if (doppler > 0) {
            tempColor.lerp(b[3], doppler * 0.95)
            scaleMult *= 1.0 + doppler * 0.85
          } else if (doppler < 0) {
            tempColor.lerp(b[2], -doppler * 0.95)
            scaleMult *= 1.0 + doppler * 0.45
          }

          rChan = tempColor.r
          gChan = tempColor.g
          bChan = tempColor.b

          if (attractionFactor > 0) {
            rChan += (1.0 - rChan) * attractionFactor * 0.5
            gChan += (0.9 - gChan) * attractionFactor * 0.5
            bChan += (0.2 - bChan) * attractionFactor * 0.5
          }

          if (waveGlowBoost > 0) {
            // Flare up into glowing white-hot gas as the shockwave sweeps through
            rChan += (1.0 - rChan) * waveGlowBoost * 0.85
            gChan += (0.95 - gChan) * waveGlowBoost * 0.85
            bChan += (1.0 - bChan) * waveGlowBoost * 0.85
          }

          if (scaleMult > 1) {
            rChan = Math.min(1.0, rChan * scaleMult)
            gChan = Math.min(1.0, gChan * scaleMult)
            bChan = Math.min(1.0, bChan * scaleMult)
          } else if (scaleMult < 1) {
            rChan = Math.max(0.02, rChan * scaleMult)
            gChan = Math.max(0.01, gChan * scaleMult)
            bChan = Math.max(0.0, bChan * scaleMult)
          }
        }

        colors[idx3] = rChan
        colors[idx3 + 1] = gChan
        colors[idx3 + 2] = bChan
      }

      posAttr.needsUpdate = true
      colAttr.needsUpdate = true
      sizeAttr.needsUpdate = true

      if (activeScale) {
        pointsObject.scale.lerp(new J(1, 1, 1), delta * fl.entranceGrowSpeed)
      }

      if (fl.autoReturnToFront && hasScrolled && !isUserDragging) {
        if (autoReturnTimer > 0.001) {
          let bhCenter = centerVec
          let frontPos = new J(0, 35, 240)
          let backPos = new J(0, 35, -240)

          let chosenTarget =
            camera.position.distanceToSquared(frontPos) < camera.position.distanceToSquared(backPos)
              ? frontPos
              : backPos

          if (camera.position.distanceToSquared(chosenTarget) < 25) {
            autoReturnTimer = Math.max(0, autoReturnTimer - delta * fl.autoReturnForceDecay)
          }

          let lerpForce = autoReturnTimer * 5
          camera.position.lerp(chosenTarget, delta * lerpForce)

          camera.up.set(0, 1, 0)

          normalVec.subVectors(camera.position, bhCenter).setLength(240)
          camera.position.copy(bhCenter).add(normalVec)

          controls.target.lerp(bhCenter, delta * lerpForce)
        } else {
          hasScrolled = false
        }
      }
      if (!isUserDragging) {
        camera.up.set(0, 1, 0)
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup logic on component unmount to prevent leaks!
    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(activeScaleTimeout)

      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      container.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)

      controls.removeEventListener('start', onControlsStart)
      controls.removeEventListener('end', onControlsEnd)
      controls.dispose()

      ehGeom.dispose()
      ehMat.dispose()
      glowTexture.dispose()
      glowSpriteMat.dispose()
      particleGeometry.dispose()
      shaderMat.dispose()

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-[120%] w-full pointer-events-auto -translate-y-[15%] sm:-translate-y-[18%]"
      style={{ background: 'transparent' }}
    />
  )
}
