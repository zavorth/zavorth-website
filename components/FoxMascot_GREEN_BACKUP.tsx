'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/*
  FoxMascot — Basilisk Hero Character

  Motion philosophy: calm, intelligent, premium, slightly alive.
  Think quiet 3D idle loop, not cartoon bounce.

  Layers (all slightly de-synced for organic feel):
    1. Idle float    – very gentle vertical drift
    2. Breathing     – subtle scale expansion/contraction
    3. Head tilt     – slow restrained rotation suggesting awareness
    4. Eye tracking  – pupils follow cursor smoothly (desktop only)
    5. Blink         – rare, natural, random interval
    6. Glow pulse    – gentle shadow/highlight breath
    7. Hover         – restrained tremor + body pulse (not explosive)
    8. Arms/ears     – extremely subtle secondary motion
*/

type FoxMascotProps = {
  size?: number
  className?: string
  bodyColor?: string
  accentColor?: string
  eyeColor?: string
  pupilColor?: string
  lookAtId?: string
}

export default function FoxMascot({
  size = 220,
  className = '',
  bodyColor = '#10b981',
  accentColor = '#065f46',
  eyeColor = '#064e3b',
  pupilColor = '#10b981',
  lookAtId,
}: FoxMascotProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const floatRef = useRef<HTMLDivElement | null>(null)
  const shakeRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tiltGroupRef = useRef<SVGGElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  const leftEarRef = useRef<SVGPathElement | null>(null)
  const rightEarRef = useRef<SVGPathElement | null>(null)
  const leftArmGroupRef = useRef<SVGGElement | null>(null)
  const rightArmGroupRef = useRef<SVGGElement | null>(null)
  const leftEyeGroupRef = useRef<SVGGElement | null>(null)
  const rightEyeGroupRef = useRef<SVGGElement | null>(null)
  const leftPupilRef = useRef<SVGCircleElement | null>(null)
  const rightPupilRef = useRef<SVGCircleElement | null>(null)
  const bodyRef = useRef<SVGCircleElement | null>(null)

  const hoverShakeRef = useRef<gsap.core.Timeline | null>(null)
  const blinkDelayRef = useRef<gsap.core.Tween | null>(null)
  const blinkTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const rafRef = useRef<number | null>(null)
  const alertTlRef = useRef<gsap.core.Timeline | null>(null)

  /* ── GSAP-driven idle animations ── */
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      /* Set transform origins */
      gsap.set([leftEarRef.current, rightEarRef.current], {
        transformBox: 'fill-box',
        transformOrigin: '50% 100%',
      })

      gsap.set(leftArmGroupRef.current, {
        transformBox: 'fill-box',
        transformOrigin: '100% 30%',
        rotation: -10,
      })

      gsap.set(rightArmGroupRef.current, {
        transformBox: 'fill-box',
        transformOrigin: '0% 30%',
        rotation: 10,
      })

      gsap.set([leftEyeGroupRef.current, rightEyeGroupRef.current], {
        transformBox: 'fill-box',
        transformOrigin: '50% 50%',
        scaleY: 1,
      })

      gsap.set(tiltGroupRef.current, {
        transformBox: 'fill-box',
        transformOrigin: '50% 50%',
      })

      if (prefersReducedMotion) {
        /* Reduced motion: only the faintest glow breath */
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: 0.88,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          })
        }
        return
      }

      /* ── 1. Idle float (very gentle) ── */
      gsap.to(floatRef.current, {
        y: -10,
        duration: 4.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      /* ── 2. Breathing (subtle body scale) ── */
      gsap.to(bodyRef.current, {
        attr: { r: 152.7 },
        duration: 4.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.6,
      })

      /* ── 3. Head tilt (slow awareness rotation) ── */
      const headTilt = gsap.timeline({ repeat: -1, delay: 1.2 })
      headTilt
        .to(tiltGroupRef.current, {
          rotation: -3,
          duration: 2.9,
          ease: 'sine.inOut',
        })
        .to(tiltGroupRef.current, {
          rotation: 1.5,
          duration: 2.9,
          ease: 'sine.inOut',
        })
        .to(tiltGroupRef.current, {
          rotation: 0,
          duration: 2.5,
          ease: 'sine.inOut',
        })

      /* ── 4. Blink (rare, organic interval) ── */
      const scheduleBlink = () => {
        const nextBlink = gsap.utils.random(3.5, 7)

        blinkDelayRef.current = gsap.delayedCall(nextBlink, () => {
          blinkTimelineRef.current = gsap
            .timeline({ onComplete: scheduleBlink })
            .to([leftEyeGroupRef.current, rightEyeGroupRef.current], {
              scaleY: 0.06,
              duration: 0.07,
              ease: 'power2.in',
            })
            .to([leftEyeGroupRef.current, rightEyeGroupRef.current], {
              scaleY: 1,
              duration: 0.14,
              ease: 'power2.out',
            })
        })
      }
      scheduleBlink()

      /* ── 5. Glow pulse (subtle shadow breath) ── */
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.92,
          duration: 4.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: 0.3,
        })
      }

      /* ── 6. Arms (extremely subtle secondary motion) ── */
      gsap.to(leftArmGroupRef.current, {
        rotation: -13,
        y: -1.5,
        duration: 4.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      gsap.to(rightArmGroupRef.current, {
        rotation: 13,
        y: -1.5,
        duration: 5.1,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })

      /* ── 7. Ears (barely perceptible tilt) ── */
      gsap.to(leftEarRef.current, {
        rotation: -1.5,
        duration: 5.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      })

      gsap.to(rightEarRef.current, {
        rotation: 1.5,
        duration: 6.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      })

      /* ── 8. Hover: restrained tremor (not explosive) ── */
      const hoverShake = gsap.timeline({ paused: true, repeat: -1 })
      hoverShake
        .to(shakeRef.current, {
          x: 0.6,
          y: -0.4,
          rotate: -0.4,
          duration: 0.04,
          ease: 'none',
        })
        .to(shakeRef.current, {
          x: -0.5,
          y: 0.4,
          rotate: 0.3,
          duration: 0.04,
          ease: 'none',
        })
        .to(shakeRef.current, {
          x: 0.4,
          y: 0.2,
          rotate: -0.2,
          duration: 0.04,
          ease: 'none',
        })
        .to(shakeRef.current, {
          x: -0.3,
          y: -0.3,
          rotate: 0.2,
          duration: 0.04,
          ease: 'none',
        })
        .to(shakeRef.current, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 0.04,
          ease: 'none',
        })

      hoverShakeRef.current = hoverShake

      const handleMouseEnter = () => {
        hoverShakeRef.current?.play()
      }

      const handleMouseLeave = () => {
        hoverShakeRef.current?.pause(0)
        gsap.set(shakeRef.current, { x: 0, y: 0, rotate: 0 })
      }

      root.addEventListener('mouseenter', handleMouseEnter)
      root.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        root.removeEventListener('mouseenter', handleMouseEnter)
        root.removeEventListener('mouseleave', handleMouseLeave)
        hoverShakeRef.current?.kill()
        blinkDelayRef.current?.kill()
        blinkTimelineRef.current?.kill()
        hoverShakeRef.current = null
        blinkDelayRef.current = null
        blinkTimelineRef.current = null
      }
    },
    { scope: rootRef }
  )

  /* ── Eye tracking (rAF driven, desktop only) ── */
  useEffect(() => {
    const svg = svgRef.current
    const leftPupil = leftPupilRef.current
    const rightPupil = rightPupilRef.current

    if (!svg || !leftPupil || !rightPupil) return

    /* Skip on touch devices or reduced motion */
    const isTouchDevice =
      typeof window !== 'undefined' &&
      (!window.matchMedia('(pointer: fine)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    if (isTouchDevice) return

    /*
      Eye tracking parameters:
      - activationDistance: how far (in CSS px) the cursor must be to begin tracking
      - maxMove: how many SVG units the pupil can travel from center
      - smoothing: interpolation speed (lower = smoother / laggier)
    */
    const activationDistance = 500
    const maxMove = 18
    const smoothing = 0.1

    const base = {
      left: { x: 356, y: 283 },
      right: { x: 444, y: 283 },
    }

    const current = {
      left: { x: base.left.x, y: base.left.y },
      right: { x: base.right.x, y: base.right.y },
    }

    const target = {
      left: { x: base.left.x, y: base.left.y },
      right: { x: base.right.x, y: base.right.y },
    }

    const mouse = { x: 0, y: 0, active: false }

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max)

    const resetTargets = () => {
      target.left.x = base.left.x
      target.left.y = base.left.y
      target.right.x = base.right.x
      target.right.y = base.right.y
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleBlur = () => {
      mouse.active = false
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) mouse.active = false
    }

    const updateTargets = () => {
      let tx = mouse.x
      let ty = mouse.y
      let active = mouse.active

      if (lookAtId) {
        const targetEl = document.getElementById(lookAtId)
        if (targetEl) {
          const tRect = targetEl.getBoundingClientRect()
          tx = tRect.left + tRect.width / 2
          ty = tRect.top + tRect.height / 2
          active = true
        }
      }

      if (!active) {
        resetTargets()
        return
      }

      const rect = svg.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(tx - centerX, ty - centerY)

      if (!lookAtId && dist > activationDistance) {
        resetTargets()
        return
      }

      const scaleX = 800 / rect.width
      const scaleY = 600 / rect.height
      const mxSvg = (tx - rect.left) * scaleX
      const mySvg = (ty - rect.top) * scaleY
      const strength = lookAtId ? 1 : (1 - clamp(dist / activationDistance, 0, 1))

      ;(['left', 'right'] as const).forEach((side) => {
        const eye = base[side]
        const dx = mxSvg - eye.x
        const dy = mySvg - eye.y
        const angle = Math.atan2(dy, dx)

        target[side].x = eye.x + Math.cos(angle) * maxMove * strength
        target[side].y = eye.y + Math.sin(angle) * maxMove * strength
      })
    }

    const animate = () => {
      updateTargets()

      current.left.x += (target.left.x - current.left.x) * smoothing
      current.left.y += (target.left.y - current.left.y) * smoothing
      current.right.x += (target.right.x - current.right.x) * smoothing
      current.right.y += (target.right.y - current.right.y) * smoothing

      leftPupil.setAttribute('cx', current.left.x.toFixed(2))
      leftPupil.setAttribute('cy', current.left.y.toFixed(2))
      rightPupil.setAttribute('cx', current.right.x.toFixed(2))
      rightPupil.setAttribute('cy', current.right.y.toFixed(2))

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', handleBlur)
    document.addEventListener('mouseout', handleMouseOut)

    animate()

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handleBlur)
      document.removeEventListener('mouseout', handleMouseOut)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])


  return (
    <div
      ref={rootRef}
      className={`inline-block ${className}`}
      style={{ width: size }}
      aria-label="Mascote Basilisk"
    >
      {/* Glow layer (behind mascot) */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-75"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'scale(1.6)',
        }}
        aria-hidden="true"
      />

      <div ref={floatRef} className="will-change-transform">
        <div ref={shakeRef} className="origin-center will-change-transform">
          <svg
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 600"
            role="img"
            aria-hidden="true"
            className="block h-auto w-full select-none overflow-visible"
            style={{
              filter: 'drop-shadow(0 12px 24px rgba(16,185,129,0.2))',
            }}
          >
            <g ref={tiltGroupRef}>
              {/* Ears */}
              <g id="ears">
                <path
                  ref={leftEarRef}
                  d="M334 184 L349 122 Q352 110 361 118 L389 168 Q394 178 382 179 Z"
                  fill={accentColor}
                />
                <path
                  ref={rightEarRef}
                  d="M466 184 L451 122 Q448 110 439 118 L411 168 Q406 178 418 179 Z"
                  fill={accentColor}
                />
              </g>

              {/* Arms */}
              <g id="arms">
                <g ref={leftArmGroupRef}>
                  <ellipse cx="290" cy="326" rx="22" ry="17" fill={accentColor} />
                </g>
                <g ref={rightArmGroupRef}>
                  <ellipse cx="510" cy="326" rx="22" ry="17" fill={accentColor} />
                </g>
              </g>

              {/* Body */}
              <circle
                ref={bodyRef}
                cx="400"
                cy="305"
                r="150"
                fill={bodyColor}
              />

              {/* Legs */}
              <g id="legs">
                <rect x="368" y="436" width="20" height="24" rx="10" fill={accentColor} />
                <rect x="412" y="436" width="20" height="24" rx="10" fill={accentColor} />
              </g>

              {/* Eyes + Pupils */}
              <g id="eyes">
                <g ref={leftEyeGroupRef}>
                  <circle cx="356" cy="280" r="19" fill={eyeColor} />
                  <circle
                    ref={leftPupilRef}
                    cx="356"
                    cy="283"
                    r="5"
                    fill={pupilColor}
                  />
                </g>
                <g ref={rightEyeGroupRef}>
                  <circle cx="444" cy="280" r="19" fill={eyeColor} />
                  <circle
                    ref={rightPupilRef}
                    cx="444"
                    cy="283"
                    r="5"
                    fill={pupilColor}
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
