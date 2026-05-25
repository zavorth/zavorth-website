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
  particleCount: 38000,
  colorSaturation: 1.1,
  scatterTop: 1.0,
  scatterBottom: 0.15,
  shrinkSpeed: 12.0,
  entranceDelayMs: 300,
  entranceGrowSpeed: 0.8,
  entranceLingerSeconds: 1.0,
  eventHorizonRadius: 32.0,
  accretionDiskRadius: 140.0,
  gravityLensing: 1.45,
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
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

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
    let b: THREE.Color[],
      targetColors: THREE.Color[] = [] // Base colors
    let isMouseActive = false
    let autoReturnTimer = 0.15
    let isUserDragging = false
    let hasScrolled = false
    let activeScale = false
    let timeTracker = 0
    let clock = new xa()
    let currentPaletteIndex = 0
    let waveRadius = -999.0

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
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false
      })
    } catch (err) {
      console.warn('WebGL context creation failed — black hole disabled:', err)
      return
    }
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
    eventHorizonMesh.position.y = 35 
    scene.add(eventHorizonMesh)

    // 5b. Radial Glow Halo around the Event Horizon
    const glowCanvas = document.createElement('canvas')
    glowCanvas.width = 512
    glowCanvas.height = 512
    const gctx = glowCanvas.getContext('2d')!
    const gradient = gctx.createRadialGradient(256, 256, 60, 256, 256, 256)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.0)')     
    gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.0)')   
    gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.25)')   
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.35)')   
    gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)')     
    gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.1)')   
    gradient.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)')    
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
    let u = { count: fl.particleCount }
    particleGeometry = new wr()

    const staticPositions = new Float32Array(u.count * 3) 
    const staticRandoms = new Float32Array(u.count * 3) // x: sizeScale, y: radScatter, z: depthSeed
    const staticIndices = new Float32Array(u.count) 

    let photonRingCount = Math.floor(u.count * 0.16)
    let bgCount = Math.floor(u.count * 0.12)
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
        sizeVal = 0.6 + Math.random() * 0.8
      } else if (e < diskStartIdx) {
        // Background stars
        rVal = 180.0 + Math.random() * 150.0
        thetaVal = Math.random() * Math.PI * 2
        zVal = Math.acos(2.0 * Math.random() - 1.0)
        sizeVal = 0.25 + Math.random() * 0.5
      } else {
        // Accretion Disk - continuous circular distribution (no spiral arms!)
        let normRadius = Math.pow(Math.random(), 1.8)
        rVal = fl.eventHorizonRadius * 1.25 + (fl.accretionDiskRadius - fl.eventHorizonRadius * 1.25) * normRadius
        
        // Perfectly uniform circular distribution
        thetaVal = Math.random() * Math.PI * 2
        
        // Flared thickness: disk is thin near the horizon and gets thicker at the outer edge
        zVal = (Math.random() + Math.random() - 1.0) * (0.8 + normRadius * 6.0)
        
        sizeVal = 0.5 + Math.random() * 1.0
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
      uParticleCount: { value: Number(u.count) }
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
        uniform float uParticleCount;

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
            
            float shrinkRatio = min(1.0, uScrollProgress * 2.0); 
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
                
                // Keplerian velocity component along Z-axis (towards/away from camera)
                // Corrected to use -cosA so that Doppler beaming is symmetric left/right!
                orbitalVelocityZ = -cosA * cosIncl * (40.0 / (baseRadSqrt + 0.01));
                
                px *= (0.3 + 0.7 * P);
                py *= (0.3 + 0.7 * P);
                pz *= (0.1 + 0.9 * P);
                
                // Continuous, smooth laminar gas cloud size (no spiral filament clumping)
                finalSize = sizeScale * (0.8 + (1.0 - min(baseRadius / accretionDiskRadius, 1.0)) * 1.5);
            }
            
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

            // Elegant entrance fade on load (no position scaling to avoid clumping)
            float entranceScale = smoothstep(0.0, 2.5, uTime);
            
            // Compute mouse click color transition wave
            float dist = length(vec3(px, py, pz));
            float blendT = 0.0;
            if (uWaveRadius >= 0.0) {
                blendT = clamp((uWaveRadius - dist) / uWaveWidth + 0.5, 0.0, 1.0);
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
            float scrollFade = 1.0 - uScrollProgress * 0.85;
            
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
                finalCol = mix(thermalCol, vec3(0.88, 0.98, 1.0) * entranceScale * scrollFade, doppler * 0.95);
                brightnessMultiplier = 1.0 + doppler * 0.85;
            } else if (doppler < 0.0) {
                finalCol = mix(thermalCol, vec3(0.92, 0.18, 0.45) * entranceScale * scrollFade, -doppler * 0.95);
                brightnessMultiplier = 1.0 + doppler * 0.45;
            }
            
            // Click wave boost
            float waveGlowBoost = 0.0;
            if (uWaveRadius >= 0.0) {
                float wDist = abs(dist - uWaveRadius);
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
            alpha *= (1.0 - uScrollProgress * 0.85);
            
            vec3 boostedColor = vColor * 1.35 + vec3(0.04, 0.01, 0.06);
            gl_FragColor = vec4(boostedColor, alpha * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    materialRef.current = shaderMat

    pointsObject = new ui(particleGeometry, shaderMat)
    // Initialize points scale to (1,1,1) so particles don't clump at the center on start
    pointsObject.scale.set(1, 1, 1)
    pointsObject.position.y = 35 
    pointsObject.visible = false
    scene.add(pointsObject)

    let activeScaleTimeout = setTimeout(() => {
      pointsObject.visible = true
      activeScale = true
    }, fl.entranceDelayMs)

    const onPointerMove = (e: PointerEvent) => {
      // Raycasting target tracking is updated, but pointer attraction has been removed as per mouse movement tilt policy
    }

    const onPointerLeave = () => {
      isMouseActive = false
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

      // Reset and trigger propagating wave
      waveRadius = 0.0

      currentPaletteIndex = (currentPaletteIndex + 1) % PALETTES.length
      const nextPalette = PALETTES[currentPaletteIndex]

      fl.coreGreenColor = nextPalette.coreGreenColor
      fl.coreYellowColor = nextPalette.coreYellowColor
      fl.coreRedColor = nextPalette.coreRedColor
      fl.coreBlueColor = nextPalette.coreBlueColor

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

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)

    // Reuse temporary variables to prevent garbage collection spikes in 60 FPS loop
    const normalVec = new J()
    const centerVec = new J(0, 35, 0)
    let animationFrameId: number

    // Animation loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      let delta = clock.getDelta()
      
      // Increment timeTracker directly on mount for immediate fade-in
      timeTracker += delta

      for (let k = 0; k < 4; k++) {
        if (b[k] && targetColors[k]) {
          b[k].lerp(targetColors[k], delta * 4.0)
        }
      }

      if (glowSpriteMat && b[0]) {
        glowSpriteMat.color.copy(b[0])
      }

      // Update wave propagation
      if (waveRadius >= 0.0) {
        waveRadius += delta * 550.0 // propagate outwards
        if (waveRadius > 500.0) {
          waveRadius = -999.0
          // Finalize palette copy to base colors
          for (let k = 0; k < 4; k++) {
            b[k].copy(targetColors[k])
          }
        }
      } else {
        // No active wave, base colors can gently lerp
        for (let k = 0; k < 4; k++) {
          if (b[k] && targetColors[k]) {
            b[k].lerp(targetColors[k], delta * 4.0)
          }
        }
      }

      // Force Three.js to re-upload uniforms to GPU for smooth color transitions
      if (uniforms.uColors) {
        uniforms.uColors.value = [b[0], b[1], b[2], b[3]]
      }
      if (uniforms.uNewColors) {
        uniforms.uNewColors.value = [targetColors[0], targetColors[1], targetColors[2], targetColors[3]]
      }
      uniforms.uWaveRadius.value = waveRadius

      // Smooth scroll tracking directly in RAF loop
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
      const height = typeof window !== 'undefined' ? window.innerHeight : 800
      const scrollableHeight = height * 0.3
      let targetProgress = Math.min(1.0, Math.max(0.0, scrollY / scrollableHeight))

      // Smooth scroll interpolation (damping: 0.15 scroll down, 0.25 scroll up)
      const damping = targetProgress < scrollRatioCurrent ? 0.25 : 0.15
      scrollRatioCurrent += (targetProgress - scrollRatioCurrent) * damping

      let shrinkRatio = Math.min(1.0, scrollRatioCurrent * fl.shrinkSpeed)
      let targetScatter = fl.scatterTop - (fl.scatterTop - fl.scatterBottom) * shrinkRatio
      scatterCurrent += (targetScatter - scatterCurrent) * damping

      let currentY = 35 + scrollRatioCurrent * 45
      centerVec.y = currentY

      // Calculate entrance scale for event horizon mesh and halo glow
      let entranceScale = Math.min(1.0, timeTracker / 2.5)

      if (eventHorizonMesh) {
        let targetScale = (1.0 - scrollRatioCurrent * 0.3) * entranceScale
        let depthScale = targetScale * (0.2 + 0.8 * scatterCurrent)
        eventHorizonMesh.scale.set(targetScale, targetScale, depthScale)
        eventHorizonMesh.position.set(0, currentY, 0)
      }

      if (glowSprite && glowSpriteMat && b[0]) {
        let glowBreathe = Math.sin(timeTracker * 1.5) * 0.12 + 0.88
        let glowOpacity = (0.45 + 0.1 * Math.sin(timeTracker * 2.2)) * (1.0 - scrollRatioCurrent * 0.8) * entranceScale
        let currentScrollScale = (1.0 - scrollRatioCurrent * 0.6) * entranceScale
        glowSprite.scale.set(
          fl.eventHorizonRadius * 5.5 * glowBreathe * currentScrollScale,
          fl.eventHorizonRadius * 5.5 * glowBreathe * currentScrollScale,
          1
        )
        glowSpriteMat.opacity = glowOpacity
        glowSprite.position.set(0, currentY, 0)
      }

      if (pointsObject) pointsObject.position.y = currentY

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

    // Cleanup logic on component unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(activeScaleTimeout)

      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
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
        className="absolute inset-0 z-0 h-[120%] w-full pointer-events-auto -translate-y-[15%] sm:-translate-y-[18%]"
        style={{ background: 'transparent' }}
      />
    </div>
  )
}
