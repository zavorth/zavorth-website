'use client'

import React, { useEffect, useRef, useState } from 'react'
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

// Configuration defaults representing our Relativistic Black Hole
const DEFAULTS = {
  particleCount: 46000,
  mobileParticleCount: 17000,
  colorSaturation: 1.16,
  scatterTop: 1.0,
  scatterBottom: 0.15,
  shrinkSpeed: 10.0,
  entranceDelayMs: 0,
  entranceGrowSpeed: 0.8,
  entranceLingerSeconds: 1.2,
  eventHorizonRadius: 32.0,
  accretionDiskRadius: 140.0,
  gravityLensing: 1.45,
  dopplerIntensity: 1.3,
  orbitalSpeed: 0.9,
  coreGreenColor: '#f59e0b', // Accretion disk amber
  coreYellowColor: '#ffd166', // Core accretion gold
  coreRedColor: '#ff6b00', // Redshifted warm gas
  coreBlueColor: '#fff4dc', // White-hot warm core
  autoReturnToFront: false,
  autoReturnForce: 0.15,
  autoReturnForceDecay: 0.02
}

function resolveParticleCount(baseCount: number, mobileCount: number, renderer: THREE.WebGLRenderer) {
  if (typeof window === 'undefined') return baseCount
  const narrowViewport = Math.min(window.innerWidth, window.innerHeight) < 760
  const coarsePointer = typeof window.matchMedia === 'function'
    && window.matchMedia('(pointer: coarse)').matches
  const reducedMotion = typeof window.matchMedia === 'function'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const lowWebGlTier = !renderer.capabilities.isWebGL2 || renderer.capabilities.maxTextureSize < 4096

  return narrowViewport || coarsePointer || reducedMotion || lowWebGlTier
    ? Math.min(baseCount, mobileCount)
    : baseCount
}

export function BlackHoleCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)
  const [touchHintVisible, setTouchHintVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const container = containerRef.current
    let fl = { ...DEFAULTS }

    // Mobile / coarse-pointer detection: drives touch-scroll fix, auto-rotate and the touch hint.
    const isCoarsePointer = typeof window.matchMedia === 'function'
      && window.matchMedia('(pointer: coarse)').matches
    const prefersReducedMotion = typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Cap pixel ratio harder on mobile for performance.
    const maxPixelRatio = isCoarsePointer ? 1.5 : 2

    let hintDismissed = false
    let hintAutoHideTimer: ReturnType<typeof setTimeout> | null = null
    if (isCoarsePointer && !prefersReducedMotion) {
      setTouchHintVisible(true)
      hintAutoHideTimer = setTimeout(() => {
        hintDismissed = true
        setTouchHintVisible(false)
      }, 7000)
    }
    const dismissTouchHint = () => {
      if (hintDismissed) return
      hintDismissed = true
      if (hintAutoHideTimer) clearTimeout(hintAutoHideTimer)
      setTouchHintVisible(false)
    }

    function ml(e: number, t: number, n: number) {
      let r = Math.max(0, Math.min(1, (n - e) / (t - e)))
      return r * r * (3 - 2 * r)
    }

    function hslToHex(h: number, s: number, l: number) {
      l /= 100
      const a = (s * Math.min(l, 1 - l)) / 100
      const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
      }
      return `#${f(0)}${f(8)}${f(4)}`
    }

    function hueDistance(a: number, b: number) {
      const diff = Math.abs(a - b) % 360
      return Math.min(diff, 360 - diff)
    }

    function buildRandomPalette(previousHue: number) {
      let baseHue = Math.floor(Math.random() * 360)
      let attempts = 0
      while (hueDistance(baseHue, previousHue) < 42 && attempts < 8) {
        baseHue = Math.floor(Math.random() * 360)
        attempts += 1
      }

      const harmonyType = Math.floor(Math.random() * 5)
      const saturation = 76 + Math.floor(Math.random() * 20)
      const baseLightness = 45 + Math.floor(Math.random() * 16)
      const wideOffset = 128 + Math.floor(Math.random() * 78)
      const softOffset = 24 + Math.floor(Math.random() * 44)

      let h0 = baseHue
      let h1 = (baseHue + softOffset) % 360
      let h2 = (baseHue + wideOffset) % 360

      if (harmonyType === 1) {
        h1 = (baseHue + 118 + Math.floor(Math.random() * 22)) % 360
        h2 = (baseHue + 238 + Math.floor(Math.random() * 22)) % 360
      } else if (harmonyType === 2) {
        h1 = (baseHue + 180 + Math.floor(Math.random() * 28) - 14 + 360) % 360
        h2 = (baseHue + 54 + Math.floor(Math.random() * 64)) % 360
      } else if (harmonyType === 3) {
        h1 = (baseHue + 72 + Math.floor(Math.random() * 36)) % 360
        h2 = (baseHue + 216 + Math.floor(Math.random() * 52)) % 360
      } else if (harmonyType === 4) {
        h1 = (baseHue - softOffset + 360) % 360
        h2 = (baseHue + 150 + Math.floor(Math.random() * 74)) % 360
      }

      const h3 = (baseHue + Math.floor(Math.random() * 90) - 45 + 360) % 360

      return {
        baseHue,
        colors: {
          coreGreenColor: hslToHex(h0, saturation, baseLightness),
          coreYellowColor: hslToHex(h1, Math.min(96, saturation + 8), Math.min(88, baseLightness + 12)),
          coreRedColor: hslToHex(h2, Math.max(58, saturation - 10), Math.max(30, baseLightness - 9)),
          coreBlueColor: hslToHex(h3, 22 + Math.floor(Math.random() * 26), 90 + Math.floor(Math.random() * 8))
        }
      }
    }

    // Global simulation variables
    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer,
      controls: OrbitControls
    let particleGeometry: THREE.BufferGeometry, pointsObject: THREE.Points
    let b: THREE.Color[],
      targetColors: THREE.Color[] = [] // Base colors
    let isMouseActive = false
    let autoReturnTimer = 0.15
    let isUserDragging = false
    let hasScrolled = false
    let activeScale = true
    let elapsedTime = 0
    let timeTracker = 0
    let lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now()
    let previousPaletteHue = 38
    let colorWaveProgress = 2.0
    let waveRadius = -999.0

    // Mobile manual rotation state (horizontal touch-drag) + inertia.
    let manualRotY = 0
    let manualRotVelocity = 0
    let touchRotating = false
    let touchStartX = 0
    let touchStartY = 0
    let touchLastX = 0

    // Physically opaque event horizon mesh
    let eventHorizonMesh: THREE.Mesh

    // Scroll animation physics tracking variables
    let scatterCurrent = fl.scatterTop
    let scatterTarget = fl.scatterTop
    let scrollRatioCurrent = 0

    // 1. Scene setup
    scene = new An()

    // 2. WebGL Renderer
    try {
      renderer = new Hc({ 
        antialias: false, 
        alpha: true,
        failIfMajorPerformanceCaveat: false
      })
    } catch (err) {
      console.warn('WebGL context creation failed — black hole disabled:', err)
      return
    }
    const initWidth = container.clientWidth || window.innerWidth
    const initHeight = container.clientHeight || window.innerHeight

    // Ensure the canvas stretches to fill the container layout in CSS
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0'
    renderer.domElement.style.left = '0'

    // Set internal resolution without overriding the 100% CSS styling
    renderer.setSize(initWidth, initHeight, false)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
    container.appendChild(renderer.domElement)
    fl.particleCount = resolveParticleCount(fl.particleCount, fl.mobileParticleCount, renderer)

    // 3. Camera
    camera = new $i(75, initWidth / initHeight, 0.1, 2000)
    camera.position.z = 240

    // 4. Orbit Controls
    controls = new $c(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.target.set(0, 35, 0) // Focus orbital rotation exactly on the active black hole center (y=35)

    // MOBILE SCROLL FIX:
    // OrbitControls sets `touch-action: none` on the canvas, which hijacks vertical
    // scrolling on touch devices. We override it with `pan-y` so the browser keeps
    // handling vertical scroll natively, and on coarse pointers we disable
    // OrbitControls entirely in favor of a custom horizontal-drag rotation below.
    renderer.domElement.style.touchAction = 'pan-y'
    container.style.touchAction = 'pan-y'
    if (isCoarsePointer) {
      controls.enabled = false
    }

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

    // 5. Black Hole Event Horizon sphere mesh (starts invisible and scales up on load)
    const ehGeom = new THREE.SphereGeometry(fl.eventHorizonRadius * 0.95, 32, 32)
    const ehMat = new THREE.MeshBasicMaterial({ color: 0x000000 })
    eventHorizonMesh = new THREE.Mesh(ehGeom, ehMat)
    eventHorizonMesh.position.y = 35 
    eventHorizonMesh.visible = false
    scene.add(eventHorizonMesh)

    // 5b. Radial Glow Halo around the Event Horizon
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 512
    glowCanvas.height = 512
    const gctx = glowCanvas.getContext('2d')!
    const gradient = gctx.createRadialGradient(256, 256, 60, 256, 256, 256)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)')     
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.0)')   
    gradient.addColorStop(0.38, 'rgba(255, 246, 224, 0.26)')
    gradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.42)')
    gradient.addColorStop(0.62, 'rgba(255, 255, 255, 0.18)')
    gradient.addColorStop(0.78, 'rgba(245, 158, 11, 0.12)')
    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)')    
    gctx.fillStyle = gradient
    gctx.fillRect(0, 0, 512, 512)
    const glowTexture = new THREE.CanvasTexture(glowCanvas)
    const glowSpriteMat = new THREE.SpriteMaterial({
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9,
      color: new THREE.Color(fl.coreGreenColor)
    })
    const glowSprite = new THREE.Sprite(glowSpriteMat)
    glowSprite.scale.set(fl.eventHorizonRadius * 6.4, fl.eventHorizonRadius * 6.4, 1)
    glowSprite.position.y = 35
    glowSprite.visible = false
    scene.add(glowSprite)

    const coronaCanvas = document.createElement('canvas')
    coronaCanvas.width = 512
    coronaCanvas.height = 512
    const coronaCtx = coronaCanvas.getContext('2d')!
    const coronaGradient = coronaCtx.createRadialGradient(256, 256, 38, 256, 256, 256)
    coronaGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    coronaGradient.addColorStop(0.22, 'rgba(255, 244, 220, 0.06)')
    coronaGradient.addColorStop(0.42, 'rgba(245, 158, 11, 0.2)')
    coronaGradient.addColorStop(0.66, 'rgba(180, 83, 9, 0.11)')
    coronaGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    coronaCtx.fillStyle = coronaGradient
    coronaCtx.fillRect(0, 0, 512, 512)
    const coronaTexture = new THREE.CanvasTexture(coronaCanvas)
    const coronaSpriteMat = new THREE.SpriteMaterial({
      map: coronaTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.24,
      color: new THREE.Color(fl.coreYellowColor)
    })
    const coronaSprite = new THREE.Sprite(coronaSpriteMat)
    coronaSprite.scale.set(fl.eventHorizonRadius * 10.5, fl.eventHorizonRadius * 10.5, 1)
    coronaSprite.position.y = 35
    coronaSprite.visible = false
    scene.add(coronaSprite)

    // 6. Particles definition
    let u = { count: fl.particleCount }
    particleGeometry = new wr()

    const staticPositions = new Float32Array(u.count * 3) 
    const staticRandoms = new Float32Array(u.count * 3) // x: sizeScale, y: radScatter, z: depthSeed
    const staticIndices = new Float32Array(u.count) 

    let photonRingCount = Math.floor(u.count * 0.18)
    let bgCount = Math.floor(u.count * 0.16)
    let diskStartIdx = photonRingCount + bgCount

    for (let e = 0; e < u.count; e++) {
      let rVal, thetaVal, zVal
      let sizeVal = 0.7 + Math.random() * 1.2
      let radScatterVal = Math.random()
      let depthSeedVal = Math.random() * 2.0 - 1.0

      staticIndices[e] = e

      if (e < photonRingCount) {
        thetaVal = Math.random() * Math.PI * 2
        rVal = fl.eventHorizonRadius * 1.005 + Math.random() * 2.5
        zVal = (Math.random() - 0.5) * 0.2
        sizeVal = 0.72 + Math.random() * 0.86
      } else if (e < diskStartIdx) {
        // Background stars
        rVal = 165.0 + Math.random() * 190.0
        thetaVal = Math.random() * Math.PI * 2
        zVal = Math.acos(2.0 * Math.random() - 1.0)
        sizeVal = 0.22 + Math.random() * 0.7
      } else {
        // Accretion Disk - continuous circular distribution (no spiral arms!)
        let normRadius = Math.pow(Math.random(), 1.8)
        rVal = fl.eventHorizonRadius * 1.25 + (fl.accretionDiskRadius - fl.eventHorizonRadius * 1.25) * normRadius
        
        // Perfectly uniform circular distribution
        thetaVal = Math.random() * Math.PI * 2
        
        // Flared thickness: disk is thin near the horizon and gets thicker at the outer edge
        zVal = (Math.random() + Math.random() - 1.0) * (0.65 + normRadius * 7.2)
        
        sizeVal = 0.58 + Math.random() * 1.05
      }

      staticPositions[e * 3] = rVal
      staticPositions[e * 3 + 1] = thetaVal
      staticPositions[e * 3 + 2] = zVal

      staticRandoms[e * 3] = sizeVal
      staticRandoms[e * 3 + 1] = radScatterVal
      staticRandoms[e * 3 + 2] = depthSeedVal
    }

    particleGeometry.setAttribute('position', new lr(staticPositions, 3))
    particleGeometry.setAttribute('aRandoms', new lr(staticRandoms, 3))
    particleGeometry.setAttribute('aIndex', new lr(staticIndices, 1))

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

    // Shader Uniforms
    const uniforms = {
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uGravityLensing: { value: fl.gravityLensing },
      uDopplerIntensity: { value: fl.dopplerIntensity },
      uOrbitalSpeed: { value: fl.orbitalSpeed },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uColors: { value: b },
      uNewColors: { value: [targetColors[0], targetColors[1], targetColors[2], targetColors[3]] },
      uWaveRadius: { value: -999.0 },
      uWaveWidth: { value: 45.0 },
      uColorWaveProgress: { value: colorWaveProgress },
      uColorWaveSoftness: { value: 0.085 },
      uParticleCount: { value: Number(u.count) },
      uScrollShrinkSpeed: { value: fl.shrinkSpeed }
    }

    // Custom depth shader - ALL physics, filaments, waves, and VIEW-SPACE lensing executed on the GPU!
    const shaderMat = new Ei({
      uniforms: uniforms,
      vertexColors: true,
      vertexShader: `
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uGravityLensing;
        uniform float uDopplerIntensity;
        uniform float uOrbitalSpeed;
        uniform float uPixelRatio;
        uniform vec3 uColors[4];
        uniform vec3 uNewColors[4];
        uniform float uWaveRadius;
        uniform float uWaveWidth;
        uniform float uColorWaveProgress;
        uniform float uColorWaveSoftness;
        uniform float uParticleCount;
        uniform float uScrollShrinkSpeed;

        attribute vec3 aRandoms; // x: sizeScale, y: radScatter, z: depthSeed
        attribute float aIndex;
        varying vec3 vColor;

        const float PI = 3.14159265359;

        // Smoothstep approximation on GPU
        float getSmoothFactor(float start, float end, float val) {
            float r = clamp((val - start) / (end - start), 0.0, 1.0);
            return r * r * (3.0 - 2.0 * r);
        }

        void main() {
            float particleIdx = aIndex;
            
            // Base static attributes from JavaScript
            float baseRadius = position.x;
            float angleOffset = position.y;
            float zDepth = position.z;
            
            float sizeScale = aRandoms.x;
            float radScatter = aRandoms.y;
            float depthSeed = aRandoms.z;
            
            float eventHorizonRadius = 32.0;
            float accretionDiskRadius = 140.0;
            
            float px = 0.0;
            float py = 0.0;
            float pz = 0.0;
            
            float shrinkRatio = min(1.0, uScrollProgress * uScrollShrinkSpeed);
            float P = 1.0 - (1.0 - 0.15) * shrinkRatio;
            
            float inclination = 0.28 * P;
            float cosIncl = cos(inclination);
            float sinIncl = sin(inclination);
            
            float orbitalVelocityZ = 0.0;
            float finalSize = sizeScale;
            
            // Particle partitioning
            float photonRingLimit = uParticleCount * 0.16;
            float bgLimit = uParticleCount * 0.28;
            
            float isPhotonRing = step(particleIdx, photonRingLimit - 0.5);
            float isBg = step(photonRingLimit - 0.5, particleIdx) * step(particleIdx, bgLimit - 0.5);
            float isDisk = step(bgLimit - 0.5, particleIdx);
            
            if (isPhotonRing > 0.5) {
                // Photon Ring
                float omega = (uOrbitalSpeed * 650.0) / (baseRadius * sqrt(baseRadius) + 0.01);
                float currentAngle = angleOffset + uTime * omega;
                
                px = baseRadius * cos(currentAngle);
                py = baseRadius * sin(currentAngle) * sinIncl;
                pz = baseRadius * sin(currentAngle) * cosIncl;
                
                px *= (0.3 + 0.7 * P);
                py *= (0.3 + 0.7 * P);
                pz *= (0.1 + 0.9 * P);
                
                finalSize = sizeScale * 1.4;
                
            } else if (isBg > 0.5) {
                // Background Stars
                float bgSpin = angleOffset + uTime * 0.015;
                px = baseRadius * cos(bgSpin) * sin(zDepth);
                py = baseRadius * sin(bgSpin) * sin(zDepth);
                pz = baseRadius * cos(zDepth);
                
            } else {
                // Accretion Disk - continuous circular motion
                float baseRadSqrt = sqrt(baseRadius);
                float omega = (uOrbitalSpeed * 350.0) / (baseRadius * baseRadSqrt + 0.01);
                float currentAngle = angleOffset + uTime * omega;
                
                float cosA = cos(currentAngle);
                float sinA = sin(currentAngle);
                
                px = baseRadius * cosA;
                float py_flat = baseRadius * sinA * sinIncl;
                float pz_flat = baseRadius * sinA * cosIncl;
                
                py = py_flat + zDepth * sinIncl * P;
                pz = pz_flat + zDepth * cosIncl * P;
                
                // Keplerian velocity component along Z-axis in view space using the view-space velocity vector
                vec3 localVelocityDir = vec3(-sinA, cosA * sinIncl, cosA * cosIncl);
                vec3 viewVelocityDir = normalMatrix * localVelocityDir;
                orbitalVelocityZ = -viewVelocityDir.z * (40.0 / (baseRadSqrt + 0.01));
                
                px *= (0.3 + 0.7 * P);
                py *= (0.3 + 0.7 * P);
                pz *= (0.1 + 0.9 * P);
                
                // Continuous, smooth laminar gas cloud size (no spiral filament clumping)
                finalSize = sizeScale * (0.8 + (1.0 - min(baseRadius / accretionDiskRadius, 1.0)) * 1.5);
            }
            
            // High-frequency hot-gas shimmering/twinkling near the event horizon
            float shimmer = 1.0;
            if (isPhotonRing > 0.5) {
                // Photon ring shimmer
                shimmer = 0.85 + 0.3 * sin(uTime * 15.0 + particleIdx * 2.3);
            } else if (isDisk > 0.5) {
                // Accretion disk inner edge shimmer
                float innerEdgeFactor = smoothstep(eventHorizonRadius * 1.8, eventHorizonRadius * 1.0, baseRadius);
                shimmer = 1.0 + innerEdgeFactor * 0.25 * sin(uTime * 12.0 + particleIdx * 1.7);
            }
            finalSize *= shimmer;
            
            // Transform to view space
            vec4 mvPosition = modelViewMatrix * vec4(px, py, pz, 1.0);
            
            // View-space position of the black hole center
            vec4 viewCenter = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
            
            // Relativistic Gravitational Lensing in View Space
            float activeLensing = uGravityLensing * P;
            if (activeLensing > 0.0 && isBg < 0.5) {
                vec3 rel = mvPosition.xyz - viewCenter.xyz;
                
                // Calculate the disk's normal in view space
                float inclination = 0.28 * P;
                float cosIncl = cos(inclination);
                float sinIncl = sin(inclination);
                vec3 normalWorld = vec3(0.0, cosIncl, -sinIncl);
                vec3 normalView = normalize(normalMatrix * normalWorld);
                
                float aspectFactor = length(normalView.xy);
                if (aspectFactor > 0.005) {
                    vec2 minorAxis = normalView.xy / aspectFactor;
                    vec2 majorAxis = vec2(-minorAxis.y, minorAxis.x);
                    
                    float x_major = dot(rel.xy, majorAxis);
                    float y_minor = dot(rel.xy, minorAxis);
                    
                    // We check if the particle is behind the black hole along the camera's line of sight
                    if (rel.z < 0.0) {
                        float r_phys = baseRadius;
                        
                        // How much we warp depends on lensing intensity and scroll progress
                        float lensWeight = smoothstep(accretionDiskRadius, eventHorizonRadius * 1.05, r_phys);
                        float finalWeight = lensWeight * min(1.0, activeLensing) * aspectFactor;
                        
                        float isEven = step(0.5, mod(particleIdx, 2.0));
                        
                        if (isEven > 0.5) {
                            // Top Arch (Primary image of the back of the disk)
                            float lensedY = sqrt(max(0.0, r_phys * r_phys - x_major * x_major));
                            float mixedY = mix(y_minor, lensedY, finalWeight);
                            
                            rel.xy = x_major * majorAxis + mixedY * minorAxis;
                            // Shift lensed depth slightly forward to prevent occlusion by the black horizon sphere
                            rel.z = mix(rel.z, eventHorizonRadius * 0.15, finalWeight);
                        } else {
                            // Bottom Arch (Secondary image of the back of the disk)
                            float r_bottom = eventHorizonRadius + (r_phys - eventHorizonRadius) * 0.15;
                            float clampedX = x_major * (r_bottom / r_phys);
                            float lensedX = clampedX;
                            float lensedY = -sqrt(max(0.0, r_bottom * r_bottom - clampedX * clampedX));
                            
                            float mixedX = mix(x_major, lensedX, finalWeight);
                            float mixedY = mix(y_minor, lensedY, finalWeight);
                            
                            rel.xy = mixedX * majorAxis + mixedY * minorAxis;
                            rel.z = mix(rel.z, eventHorizonRadius * 0.15, finalWeight);
                        }
                        
                        mvPosition.xyz = viewCenter.xyz + rel;
                    }
                }
            }

            // Elegant entrance fade on load. Keep a faint whole-object floor once revealed
            // so the black hole never appears as a collapsed vertical sliver.
            float entranceScale = smoothstep(0.0, 1.2, max(uTime, 0.18));
            
            // Whole-object color traversal. The click starts one global sweep, but each particle
            // has a stable coordinate so the new palette appears to travel through the full shape.
            float radialNorm = clamp((baseRadius - eventHorizonRadius) / (accretionDiskRadius + 150.0 - eventHorizonRadius), 0.0, 1.0);
            float angularNorm = (angleOffset + PI) / (2.0 * PI);
            float indexNorm = particleIdx / max(uParticleCount - 1.0, 1.0);
            float layerOffset = isPhotonRing * 0.03 + isBg * 0.14;
            float colorSweepCoord = clamp(radialNorm * 0.68 + angularNorm * 0.18 + indexNorm * 0.08 + layerOffset, 0.0, 1.0);
            float blendT = 1.0;
            if (uColorWaveProgress < 1.5) {
                blendT = smoothstep(colorSweepCoord - uColorWaveSoftness, colorSweepCoord + uColorWaveSoftness, uColorWaveProgress);
            }

            vec3 c0 = mix(uColors[0], uNewColors[0], blendT);
            vec3 c1 = mix(uColors[1], uNewColors[1], blendT);
            vec3 c2 = mix(uColors[2], uNewColors[2], blendT);
            vec3 c3 = mix(uColors[3], uNewColors[3], blendT);

            vec3 thermalCol = vec3(1.0);

            if (isPhotonRing > 0.5) {
                // Photon Ring: white-hot center mixed with palette
                thermalCol = mix(c3, c1, 0.18) * 0.9;
                
            } else if (isBg > 0.5) {
                // Background Stars
                float radius = baseRadius;
                float isNebula = step(0.83, fract(particleIdx * 0.17)); 
                if (isNebula > 0.5) {
                    finalSize = sizeScale * 2.2 * (0.5 + 0.5 * sin(uTime * 0.5 + radius));
                    thermalCol = c0 * 0.12;
                } else {
                    float starWhite = 0.15 + mod(particleIdx * 0.17, 0.15);
                    float tintStrength = 0.5 + mod(particleIdx * 0.13, 0.3);
                    vec3 starBase = (mod(particleIdx, 2.0) < 1.0) ? c0 : c3;
                    thermalCol = (vec3(starWhite) * (1.0 - tintStrength) + starBase * tintStrength) * 0.55;
                    thermalCol *= 0.4 + 0.6 * P;
                }
                
            } else {
                // Accretion Disk: smooth physical color gradient
                float normDist = min((baseRadius - eventHorizonRadius) / (accretionDiskRadius - eventHorizonRadius), 1.0);
                vec3 diskBaseCol = vec3(0.0);
                if (normDist < 0.12) {
                    diskBaseCol = mix(c3, c1, normDist / 0.12);
                } else if (normDist < 0.45) {
                    diskBaseCol = mix(c1, c0, (normDist - 0.12) / 0.33);
                } else if (normDist < 0.8) {
                    diskBaseCol = mix(c0, c2, (normDist - 0.45) / 0.35);
                } else {
                    diskBaseCol = mix(c2, c2 * 0.6, (normDist - 0.8) / 0.2);
                }
                
                thermalCol = diskBaseCol;
            }
            
            // Soft size fade-in on load, and soft fade-out on scroll
            float sizeFlash = smoothstep(0.0, 1.0, entranceScale);
            float scrollFade = 1.0 - uScrollProgress * 0.62;
            
            float currentSize = finalSize * sizeFlash * scrollFade * uPixelRatio * (245.0 / -mvPosition.z);
            gl_PointSize = max(0.5, currentSize);
            gl_Position = projectionMatrix * mvPosition;
            
            // Color shifting
            float thermalShift = getSmoothFactor(0.0, 1.0, getSmoothFactor(0.08, 0.55, uTime * 0.22));
            vec3 activeCol = c0;
            vec3 altCol = vec3(activeCol.b, activeCol.r, activeCol.g);
            vec3 finalBaseCol = mix(activeCol, altCol, thermalShift);
            
            if (isPhotonRing < 0.5 && isBg < 0.5) {
                thermalCol = mix(thermalCol, finalBaseCol, 0.25);
            }
            
            // Fade out opacity during entrance and scroll
            thermalCol *= entranceScale * scrollFade;
            
            // Gentle Relativistic Beaming & Doppler shifts
            float doppler = orbitalVelocityZ * 0.16 * uDopplerIntensity;
            vec3 finalCol = thermalCol;
            float brightnessMultiplier = 1.0;
            
            if (doppler > 0.0) {
                // Blueshifted (approaching): gets brighter and shifts towards white-hot core color c3
                finalCol = mix(thermalCol, c3, doppler * 0.5);
                brightnessMultiplier = 1.0 + doppler * 1.3;
            } else if (doppler < 0.0) {
                // Redshifted (receding): gets dimmer and shifts towards warm redshifted color c2
                finalCol = mix(thermalCol, c2, -doppler * 0.5);
                brightnessMultiplier = 1.0 + doppler * 0.45;
            }
            
            // Click wave boost
            float waveGlowBoost = 0.0;
            if (uWaveRadius >= 0.0) {
                float centerDist = length(vec3(px, py, pz));
                float wDist = abs(centerDist - uWaveRadius);
                if (wDist < uWaveWidth) {
                    waveGlowBoost = 1.0 - wDist / uWaveWidth;
                }
            }

            if (waveGlowBoost > 0.0) {
                brightnessMultiplier *= (1.0 + waveGlowBoost * 1.5);
            }
            
            vColor = finalCol * brightnessMultiplier;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float uScrollProgress;
        void main() {
            vec2 coord = gl_PointCoord - vec2(0.5);
            float distSq = dot(coord, coord);
            
            // Smoothly fade out at the edges instead of using hard discard
            float borderFade = 1.0 - smoothstep(0.18, 0.25, distSq);
            
            float glow = exp(-distSq * 9.0);
            float core = smoothstep(0.08, 0.0, distSq) * 0.6;
            
            float alpha = (glow + core) * borderFade;
            // Dissolve opacity on scroll
            alpha *= (1.0 - uScrollProgress * 0.62);
            
            vec3 boostedColor = vColor * 1.7 + vec3(0.12, 0.055, 0.01);
            gl_FragColor = vec4(boostedColor, alpha * 0.96);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    materialRef.current = shaderMat

    pointsObject = new ui(particleGeometry, shaderMat)
    // Set frustumCulled to false to avoid collapsed bounding box frustum culling bugs.
    pointsObject.scale.set(0, 0, 0)
    pointsObject.frustumCulled = false
    pointsObject.position.y = 35 
    pointsObject.visible = true
    scene.add(pointsObject)

    if (eventHorizonMesh) eventHorizonMesh.visible = true
    if (glowSprite) glowSprite.visible = true
    if (coronaSprite) coronaSprite.visible = true

    const onPointerMove = (e: PointerEvent) => {
      // Raycasting target tracking is updated, but pointer attraction has been removed as per mouse movement tilt policy
    }

    const onPointerLeave = () => {
      isMouseActive = false
    }

    // MOBILE MANUAL ROTATION:
    // Only engages when the user makes a *clearly horizontal* touch drag.
    // Vertical drags are ignored so the browser scrolls the page natively
    // (allowed by `touch-action: pan-y` above).
    const onTouchStart = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      touchStartX = e.clientX
      touchStartY = e.clientY
      touchLastX = e.clientX
      touchRotating = false
    }

    const onTouchMove = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      if (!touchRotating) {
        const dx = e.clientX - touchStartX
        const dy = e.clientY - touchStartY
        // Requires clear horizontal intent before engaging rotation.
        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.4) {
          touchRotating = true
          touchLastX = e.clientX
          isUserDragging = true
          dismissTouchHint()
        }
        return
      }
      const deltaX = e.clientX - touchLastX
      touchLastX = e.clientX
      manualRotY += deltaX * 0.006
      manualRotVelocity = deltaX * 0.0035
    }

    const onTouchEnd = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return
      touchRotating = false
      isUserDragging = false
    }

    if (isCoarsePointer) {
      renderer.domElement.addEventListener('pointerdown', onTouchStart, { passive: true })
      renderer.domElement.addEventListener('pointermove', onTouchMove, { passive: true })
      renderer.domElement.addEventListener('pointerup', onTouchEnd, { passive: true })
      renderer.domElement.addEventListener('pointercancel', onTouchEnd, { passive: true })
    }

    const onPointerDown = (evt: PointerEvent) => {
      // Ignore click on links, buttons, inputs, navbar controls, etc.
      const target = evt.target as HTMLElement | null
      if (target) {
        const tagName = target.tagName
        if (
          tagName === 'A' ||
          tagName === 'BUTTON' ||
          tagName === 'INPUT' ||
          tagName === 'SELECT' ||
          tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('#controls') ||
          target.closest('.hero-buttons') ||
          target.closest('header')
        ) {
          return
        }
      }

      // Reset and trigger a centered glow plus the full-object color sweep.
      waveRadius = 0.0
      colorWaveProgress = -0.08

      const nextPalette = buildRandomPalette(previousPaletteHue)
      previousPaletteHue = nextPalette.baseHue
      fl = {
        ...fl,
        ...nextPalette.colors
      }

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
      const w = containerRef.current.clientWidth || window.innerWidth
      const h = containerRef.current.clientHeight || window.innerHeight
      if (w === 0 || h === 0) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false) // pass false to preserve our 100% CSS styling
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPixelRatio))
      if (shaderMat && shaderMat.uniforms && shaderMat.uniforms.uPixelRatio) {
        shaderMat.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, maxPixelRatio)
      }
    }

    const resizeObserver = new ResizeObserver(() => onResize())
    resizeObserver.observe(containerRef.current)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)

    // Reuse temporary variables to prevent garbage collection spikes in 60 FPS loop
    const normalVec = new J()
    const centerVec = new J(0, 35, 0)
    let animationFrameId: number

    let wasOffscreen = false

    // Animation loop
    const animate = () => {
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
      const height = typeof window !== 'undefined' ? window.innerHeight : 800
      const heroSection = container.closest('#hero') as HTMLElement | null
      const heroRect = heroSection?.getBoundingClientRect()
      const isOffscreen = heroRect
        ? heroRect.bottom < -height * 0.08 || heroRect.top > height * 1.12
        : scrollY > height * 1.5

      if (isOffscreen) {
        wasOffscreen = true
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      if (wasOffscreen) {
        lastTime = typeof performance !== 'undefined' ? performance.now() : Date.now() // reset time reference to prevent jump
        wasOffscreen = false
      }

      animationFrameId = requestAnimationFrame(animate)

      const currentTime = typeof performance !== 'undefined' ? performance.now() : Date.now()
      let delta = (currentTime - lastTime) / 1000
      lastTime = currentTime

      if (delta > 0.1) delta = 0.1
      if (delta < 0) delta = 0

      // Increment time tracker — entrance scale grows smoothly from frame 0
      timeTracker += delta

      // Update color traversal independently from the glow pulse. The palette only commits
      // after the global sweep has crossed every particle coordinate.
      if (colorWaveProgress < 1.5) {
        colorWaveProgress += delta * 0.68
        if (colorWaveProgress >= 1.16) {
          colorWaveProgress = 2.0
          for (let k = 0; k < 4; k++) {
            b[k].copy(targetColors[k])
          }
        }
      } else {
        for (let k = 0; k < 4; k++) {
          if (b[k] && targetColors[k]) {
            b[k].lerp(targetColors[k], delta * 4.0)
          }
        }
      }

      if (waveRadius >= 0.0) {
        waveRadius += delta * 750.0
        if (waveRadius > 1500.0) {
          waveRadius = -999.0
        }
      }

      if (glowSpriteMat && b[0] && targetColors[0] && targetColors[1]) {
        const haloBlend = Math.min(1, Math.max(0, colorWaveProgress))
        const haloWaveColor = b[0].clone().lerp(targetColors[0], haloBlend)
        haloWaveColor.lerp(targetColors[1], 0.18 + 0.08 * Math.sin(timeTracker * 1.7))
        glowSpriteMat.color.copy(haloWaveColor)
        coronaSpriteMat.color.copy(haloWaveColor)
      }

      // Force Three.js to re-upload uniforms to GPU for smooth color transitions
      if (uniforms.uColors) {
        uniforms.uColors.value = [b[0], b[1], b[2], b[3]]
      }
      if (uniforms.uNewColors) {
        uniforms.uNewColors.value = [targetColors[0], targetColors[1], targetColors[2], targetColors[3]]
      }
      uniforms.uWaveRadius.value = waveRadius
      uniforms.uColorWaveProgress.value = colorWaveProgress

      // Smooth scroll tracking directly in RAF loop, using the hero section like the reference animation.
      let targetProgress = 0
      if (heroRect && heroRect.top < 0) {
        const scrollableHeight = Math.max(1, heroRect.height - height)
        targetProgress = Math.min(1.0, Math.max(0.0, -heroRect.top / scrollableHeight))
      } else if (!heroRect) {
        const scrollableHeight = height * 0.65
        targetProgress = Math.min(1.0, Math.max(0.0, scrollY / scrollableHeight))
      }

      // Smooth scroll interpolation — responsive but smooth
      const damping = targetProgress < scrollRatioCurrent ? 0.45 : 0.35
      scrollRatioCurrent += (targetProgress - scrollRatioCurrent) * damping

      // Dynamic, constant 3D tilting wobble and rotation.
      // Decreases as user scrolls down (P gets smaller)
      const shrinkRatio = Math.min(1.0, scrollRatioCurrent * fl.shrinkSpeed)
      const P = 1.0 - (1.0 - 0.15) * shrinkRatio
      const driftY = Math.sin(timeTracker * 0.4) * 1.5 * P
      
      const wobbleTime = timeTracker * 0.22
      const rotX = Math.pow(Math.sin(wobbleTime * 2.0), 3) * 0.45 * P
      let rotY = timeTracker * 0.06 * P
      const rotZ = Math.pow(Math.sin(wobbleTime), 3) * -0.35 * P

      // MOBILE: smooth auto-rotate by default + manual horizontal-drag offset with inertia.
      if (isCoarsePointer) {
        if (!touchRotating) {
          // Inertia decay after the user lets go
          manualRotY += manualRotVelocity
          manualRotVelocity *= Math.max(0, 1 - delta * 3.2)
          // Gentle continuous auto-rotation
          if (!prefersReducedMotion) {
            manualRotY += delta * 0.07 * P
          }
        }
        rotY += manualRotY
      }

      let currentY = 35 + scrollRatioCurrent * 45 + driftY
      centerVec.y = currentY

      // Calculate entrance scale — all parts grow together from 0 in ~1 second
      let entranceScale = Math.min(1.0, timeTracker / 0.8)

      if (eventHorizonMesh) {
        let targetScale = (1.0 - scrollRatioCurrent * 0.3) * entranceScale
        let depthScale = targetScale * (0.2 + 0.8 * scatterCurrent)
        eventHorizonMesh.scale.set(targetScale, targetScale, depthScale)
        eventHorizonMesh.position.set(0, currentY, 0)
        eventHorizonMesh.rotation.set(rotX, rotY, rotZ)
      }

      if (glowSprite && glowSpriteMat && b[0]) {
        let glowBreathe = Math.sin(timeTracker * 1.5) * 0.12 + 0.88
        let glowOpacity = (0.52 + 0.12 * Math.sin(timeTracker * 2.2)) * (1.0 - scrollRatioCurrent * 0.62) * entranceScale
        let currentScrollScale = (1.08 - scrollRatioCurrent * 0.6) * entranceScale
        glowSprite.scale.set(
          fl.eventHorizonRadius * 6.4 * glowBreathe * currentScrollScale,
          fl.eventHorizonRadius * 6.4 * glowBreathe * currentScrollScale,
          1
        )
        glowSpriteMat.opacity = glowOpacity
        glowSprite.position.set(0, currentY, 0)
        glowSpriteMat.rotation = rotY
      }

      if (coronaSprite && coronaSpriteMat) {
        const coronaBreathe = Math.sin(timeTracker * 0.85) * 0.08 + 0.94
        const coronaScale = (1.08 - scrollRatioCurrent * 0.58) * entranceScale * coronaBreathe
        coronaSprite.scale.set(
          fl.eventHorizonRadius * 10.5 * coronaScale,
          fl.eventHorizonRadius * 10.5 * coronaScale,
          1
        )
        coronaSpriteMat.opacity = (0.18 + 0.05 * Math.sin(timeTracker * 1.35)) * (1.0 - scrollRatioCurrent * 0.68) * entranceScale
        coronaSprite.position.set(0, currentY, 0)
        coronaSpriteMat.rotation = -rotY * 0.6
      }

      if (pointsObject) {
        pointsObject.position.set(0, currentY, 0)
        pointsObject.rotation.set(rotX, rotY, rotZ)
        // Grow particles together with entrance scale for synchronized entrance animation
        let currentScale = Math.max(0.001, entranceScale)
        pointsObject.scale.set(currentScale, currentScale, currentScale)
      }

      // Update uniforms
      uniforms.uTime.value = timeTracker
      uniforms.uScrollProgress.value = scrollRatioCurrent

      if (fl.autoReturnToFront && hasScrolled && !isUserDragging) {
        if (autoReturnTimer > 0.001) {
          let bhCenter = centerVec
          let frontPos = new J(0, centerVec.y, 240)
          let backPos = new J(0, centerVec.y, -240)

          let chosenTarget =
            camera.position.distanceToSquared(frontPos) < camera.position.distanceToSquared(backPos)
              ? frontPos
              : backPos

          if (camera.position.distanceToSquared(chosenTarget) < 25) {
            autoReturnTimer = Math.max(0, autoReturnTimer - delta * fl.autoReturnForceDecay)
          }

          let lerpForce = autoReturnTimer * 5
          camera.position.lerp(chosenTarget, delta * lerpForce)

          // Smoothly align the up vector during auto-return
          camera.up.lerp(new J(0, 1, 0), delta * lerpForce).normalize()

          normalVec.subVectors(camera.position, bhCenter).setLength(240)
          camera.position.copy(bhCenter).add(normalVec)

          controls.target.lerp(bhCenter, delta * lerpForce)
        } else {
          hasScrolled = false
        }
      } else {
        // Complete freedom: slowly and smoothly align the up vector when user stops dragging, without snapping or locking
        if (!isUserDragging && camera.up.y < 0.999) {
          camera.up.lerp(new J(0, 1, 0), delta * 2.0).normalize()
        }
      }

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup logic on component unmount
    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)

      if (hintAutoHideTimer) clearTimeout(hintAutoHideTimer)
      if (isCoarsePointer) {
        renderer.domElement.removeEventListener('pointerdown', onTouchStart)
        renderer.domElement.removeEventListener('pointermove', onTouchMove)
        renderer.domElement.removeEventListener('pointerup', onTouchEnd)
        renderer.domElement.removeEventListener('pointercancel', onTouchEnd)
      }

      controls.removeEventListener('start', onControlsStart)
      controls.removeEventListener('end', onControlsEnd)
      controls.dispose()

      ehGeom.dispose()
      ehMat.dispose()

      glowTexture.dispose()
      glowSpriteMat.dispose()
      coronaTexture.dispose()
      coronaSpriteMat.dispose()
      particleGeometry.dispose()
      shaderMat.dispose()

      if (renderer) {
        renderer.forceContextLoss()
        renderer.dispose()
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full select-none">
      <div
        ref={containerRef}
        data-black-hole-canvas
        className="absolute inset-0 z-0 h-[120%] w-full pointer-events-auto -translate-y-[15%] sm:-translate-y-[18%]"
        style={{ background: 'transparent' }}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/45 px-4 py-2 text-[11px] tracking-wide text-neutral-300 backdrop-blur-sm transition-opacity duration-700 ${
          touchHintVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Toque e arraste para rotacionar o buraco negro
      </div>
    </div>
  )
}
