'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

/*
  FoxMascot — Basilisk Hero Character (Premium Redesign)

  Motion philosophy: calm, intelligent, premium, slightly alive.
  Layers:
    1. Idle float    – very gentle vertical drift
    2. Breathing     – subtle body scale
    3. Head tilt     – slow restrained rotation suggesting awareness
    4. Eye tracking  – pupils follow cursor smoothly (desktop only)
    5. Blink         – rare, natural, random interval
    6. Glow pulse    – gentle shadow breath
    7. Hover         – restrained tremor
    8. Tail wag      – gentle side-to-side sway
    9. Nose wiggle   – ultra-subtle nose scale pulse
   10. Ear twitch    – subtle independent ear rotation
*/

type FoxMascotProps = {
  size?: number
  className?: string
}

export default function FoxMascot({
  size = 180,
  className = '',
}: FoxMascotProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const floatRef = useRef<HTMLDivElement | null>(null)
  const shakeRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tiltGroupRef = useRef<SVGGElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  const leftEarGroupRef = useRef<SVGGElement | null>(null)
  const rightEarGroupRef = useRef<SVGGElement | null>(null)
  const leftEyeRef = useRef<SVGEllipseElement | null>(null)
  const rightEyeRef = useRef<SVGEllipseElement | null>(null)
  const leftPupilRef = useRef<SVGCircleElement | null>(null)
  const rightPupilRef = useRef<SVGCircleElement | null>(null)
  const bodyRef = useRef<SVGEllipseElement | null>(null)
  const tailRef = useRef<SVGGElement | null>(null)
  const noseRef = useRef<SVGPathElement | null>(null)

  const hoverShakeRef = useRef<gsap.core.Timeline | null>(null)
  const blinkDelayRef = useRef<gsap.core.Tween | null>(null)
  const blinkTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const rafRef = useRef<number | null>(null)

  /* ── GSAP-driven idle animations ── */
  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      /* Set transform origins based on SVG coordinates */
      gsap.set([leftEarGroupRef.current, rightEarGroupRef.current], {
        transformOrigin: '50% 90%',
      })

      gsap.set(tiltGroupRef.current, {
        transformOrigin: '256px 300px', // Rotate around lower head/neck area
      })

      gsap.set(noseRef.current, {
        transformOrigin: '256px 270px',
      })

      gsap.set(tailRef.current, {
        transformOrigin: '320px 420px', // Base of the tail
      })

      gsap.set(bodyRef.current, {
        transformOrigin: '256px 482px', // Bottom of the body
      })

      if (prefersReducedMotion) {
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
        scaleY: 1.015,
        scaleX: 0.99,
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
          rotation: -2.5,
          duration: 3.5,
          ease: 'sine.inOut',
        })
        .to(tiltGroupRef.current, {
          rotation: 1.5,
          duration: 3.2,
          ease: 'sine.inOut',
        })
        .to(tiltGroupRef.current, {
          rotation: 0,
          duration: 2.8,
          ease: 'sine.inOut',
        })

      /* ── 4. Blink (rare, organic interval) ── */
      const scheduleBlink = () => {
        const nextBlink = gsap.utils.random(3.5, 7)

        blinkDelayRef.current = gsap.delayedCall(nextBlink, () => {
          blinkTimelineRef.current = gsap
            .timeline({ onComplete: scheduleBlink })
            .to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 0.06,
              duration: 0.07,
              ease: 'power2.in',
              transformOrigin: '50% 50%',
            })
            .to([leftPupilRef.current, rightPupilRef.current], {
              opacity: 0,
              duration: 0.05,
            }, '<')
            .to([leftEyeRef.current, rightEyeRef.current], {
              scaleY: 1,
              duration: 0.14,
              ease: 'power2.out',
            })
            .to([leftPupilRef.current, rightPupilRef.current], {
              opacity: 1,
              duration: 0.1,
            }, '<')
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

      /* ── 6. Ears (barely perceptible tilt) ── */
      gsap.to(leftEarGroupRef.current, {
        rotation: -3,
        duration: 5.8,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.4,
      })

      gsap.to(rightEarGroupRef.current, {
        rotation: 3,
        duration: 6.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.8,
      })

      /* ── 7. Hover: restrained tremor ── */
      const hoverShake = gsap.timeline({ paused: true, repeat: -1 })
      hoverShake
        .to(shakeRef.current, { x: 0.6, y: -0.4, rotate: -0.4, duration: 0.04, ease: 'none' })
        .to(shakeRef.current, { x: -0.5, y: 0.4, rotate: 0.3, duration: 0.04, ease: 'none' })
        .to(shakeRef.current, { x: 0.4, y: 0.2, rotate: -0.2, duration: 0.04, ease: 'none' })
        .to(shakeRef.current, { x: -0.3, y: -0.3, rotate: 0.2, duration: 0.04, ease: 'none' })
        .to(shakeRef.current, { x: 0, y: 0, rotate: 0, duration: 0.04, ease: 'none' })

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

      /* ── 8. Tail wag (gentle sway) ── */
      gsap.to(tailRef.current, {
        rotation: 5,
        duration: 3.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      })

      /* ── 9. Nose (static) ── */
      // Nose wiggle removed per user request


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
    const lp = leftPupilRef.current
    const rp = rightPupilRef.current

    if (!svg || !lp || !rp) return

    const isTouchDevice =
      typeof window !== 'undefined' &&
      (!window.matchMedia('(pointer: fine)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    if (isTouchDevice) return

    const maxMove = 9 // Restricted to stay within the black ellipse
    const smoothing = 0.12
    const activationDistance = 1200

    // Base positions for pupils from SVG
    const base = {
      lp: { x: 208, y: 222 },
      rp: { x: 304, y: 222 },
    }

    const current = {
      lp: { ...base.lp },
      rp: { ...base.rp },
    }

    const target = {
      lp: { ...base.lp },
      rp: { ...base.rp },
    }

    const mouse = { x: 0, y: 0, active: false }

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max)

    const resetTargets = () => {
      ;(['lp', 'rp'] as const).forEach((k) => {
        target[k].x = base[k].x
        target[k].y = base[k].y
      })
    }

    const handlePointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleBlur = () => { mouse.active = false }
    const handleMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) mouse.active = false
    }

    const updateTargets = () => {
      if (!mouse.active) { resetTargets(); return }

      const rect = svg.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const dist = Math.hypot(mouse.x - centerX, mouse.y - centerY)

      if (dist > activationDistance) { resetTargets(); return }

      const scaleX = 512 / rect.width
      const scaleY = 512 / rect.height
      const mxSvg = (mouse.x - rect.left) * scaleX
      const mySvg = (mouse.y - rect.top) * scaleY
      const strength = 1 - clamp(dist / activationDistance, 0, 1)

      ;(['lp', 'rp'] as const).forEach((k) => {
        const b = base[k]
        const dx = mxSvg - b.x
        const dy = mySvg - b.y
        const angle = Math.atan2(dy, dx)
        target[k].x = b.x + Math.cos(angle) * maxMove * strength
        target[k].y = b.y + Math.sin(angle) * maxMove * strength
      })
    }

    const refs = { lp, rp }

    const animate = () => {
      updateTargets()

      ;(['lp', 'rp'] as const).forEach((k) => {
        current[k].x += (target[k].x - current[k].x) * smoothing
        current[k].y += (target[k].y - current[k].y) * smoothing
        refs[k].setAttribute('cx', current[k].x.toFixed(2))
        refs[k].setAttribute('cy', current[k].y.toFixed(2))
      })

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
            'radial-gradient(circle, rgba(248,250,252,0.2) 0%, rgba(34,211,238,0.06) 42%, transparent 72%)',
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
            viewBox="0 0 512 512"
            role="img"
            aria-hidden="true"
            className="block h-auto w-full select-none overflow-visible"
            style={{
              filter: 'drop-shadow(0 12px 24px rgba(226,232,240,0.18))',
            }}
          >
            <defs>
              <linearGradient id="fox-main" x1="140" y1="90" x2="360" y2="430" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF"/>
                <stop offset="55%" stopColor="#F1F5F9"/>
                <stop offset="100%" stopColor="#CBD5E1"/>
              </linearGradient>

              <linearGradient id="fox-shade" x1="180" y1="260" x2="320" y2="470" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E2E8F0"/>
                <stop offset="100%" stopColor="#94A3B8"/>
              </linearGradient>

              <linearGradient id="cream" x1="180" y1="180" x2="320" y2="420" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF"/>
                <stop offset="100%" stopColor="#EAF2FB"/>
              </linearGradient>

              <linearGradient id="eye" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06111E"/>
                <stop offset="100%" stopColor="#0A223A"/>
              </linearGradient>

              <radialGradient id="nose" cx="50%" cy="35%" r="70%">
                <stop offset="0%" stopColor="#3A2C2C"/>
                <stop offset="100%" stopColor="#141414"/>
              </radialGradient>

              <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.10"/>
              </filter>
            </defs>

            <g ref={tiltGroupRef}>
              <g filter="url(#soft-shadow)">
                {/* Tail */}
                <g ref={tailRef}>
                  <path
                    d="M338 316 C400 288 458 322 464 382 C470 434 430 471 370 469 C401 449 415 419 409 387 C388 414 352 426 318 414 C308 380 313 339 338 316Z"
                    fill="url(#fox-main)"
                  />
                  <path
                    d="M410 359 C440 370 455 392 453 421 C440 445 416 459 387 460 C410 447 419 424 413 402 C398 414 381 422 360 421 C384 406 401 386 410 359Z"
                    fill="url(#cream)"
                  />
                </g>

                {/* Body */}
                <ellipse ref={bodyRef} cx="256" cy="374" rx="98" ry="108" fill="url(#fox-main)"/>

                {/* Body subtle shadows */}
                <path d="M175 335 C163 359 161 399 174 425 C186 447 212 461 238 465 C212 438 205 384 210 328 C199 327 185 329 175 335Z" fill="#64748B" opacity="0.13"/>
                <path d="M337 335 C349 359 351 399 338 425 C326 447 300 461 274 465 C300 438 307 384 302 328 C313 327 327 329 337 335Z" fill="#475569" opacity="0.10"/>

                {/* Head Base */}
                <circle cx="256" cy="214" r="130" fill="url(#fox-main)"/>

                {/* Ears (Grouped for correct rotation with interiors) */}
                <g ref={leftEarGroupRef}>
                  <path d="M178 122 C156 90 148 54 151 31 C186 45 225 79 244 125 C221 118 199 116 178 122Z" fill="url(#fox-main)"/>
                  <path d="M174 114 C164 87 162 64 166 49 C190 64 213 86 229 119 C209 112 191 110 174 114Z" fill="#A7B5C8"/>
                  <path d="M188 127 C182 107 181 91 184 80 C202 90 220 105 231 126 C214 121 201 120 188 127Z" fill="url(#cream)"/>
                </g>

                <g ref={rightEarGroupRef}>
                  <path d="M334 122 C356 90 364 54 361 31 C326 45 287 79 268 125 C291 118 313 116 334 122Z" fill="url(#fox-main)"/>
                  <path d="M338 114 C348 87 350 64 346 49 C322 64 299 86 283 119 C303 112 321 110 338 114Z" fill="#A7B5C8"/>
                  <path d="M324 127 C330 107 331 91 328 80 C310 90 292 105 281 126 C298 121 311 120 324 127Z" fill="url(#cream)"/>
                </g>

                {/* Face patch */}
                <path d="M157 237 C191 220 221 228 242 248 C250 256 262 256 270 248 C291 228 321 220 355 237 C343 291 305 324 256 324 C207 324 169 291 157 237Z" fill="url(#cream)"/>

                {/* Chest */}
                <path d="M256 309 C221 309 198 336 198 373 C198 412 221 444 256 459 C291 444 314 412 314 373 C314 336 291 309 256 309Z" fill="url(#cream)"/>
                <path d="M256 344 C242 361 234 390 237 421 C243 436 249 449 256 459 C263 449 269 436 275 421 C278 390 270 361 256 344Z" fill="#F8FAFC" opacity="0.9"/>

                {/* Eyes (base) */}
                <ellipse ref={leftEyeRef} cx="208" cy="222" rx="25" ry="30" fill="url(#eye)"/>
                <ellipse ref={rightEyeRef} cx="304" cy="222" rx="25" ry="30" fill="url(#eye)"/>

                {/* Single cyan pupils (tracked) */}
                <circle ref={leftPupilRef} cx="208" cy="222" r="7.5" fill="#22D3EE"/>
                <circle ref={rightPupilRef} cx="304" cy="222" r="7.5" fill="#22D3EE"/>

                {/* Nose */}
                <path
                  ref={noseRef}
                  d="M237 266 C244 258 268 258 275 266 C281 272 276 283 256 284 C236 283 231 272 237 266Z"
                  fill="url(#nose)"
                />

                {/* Mouth */}
                <path d="M256 284 C256 295 245 301 235 297" stroke="#181818" strokeWidth="4.25" strokeLinecap="round" fill="none"/>
                <path d="M256 284 C256 295 267 301 277 297" stroke="#181818" strokeWidth="4.25" strokeLinecap="round" fill="none"/>

                {/* Front legs */}
                <path d="M216 340 C205 368 203 413 217 454 C225 462 241 462 248 454 C244 412 237 372 216 340Z" fill="url(#fox-shade)"/>
                <path d="M296 340 C307 368 309 413 295 454 C287 462 271 462 264 454 C268 412 275 372 296 340Z" fill="url(#fox-shade)"/>

                {/* Paws */}
                <path d="M195 444 C200 429 224 427 237 438 C247 447 242 466 219 467 C201 467 190 459 195 444Z" fill="#2A1212"/>
                <path d="M317 444 C312 429 288 427 275 438 C265 447 270 466 293 467 C311 467 322 459 317 444Z" fill="#2A1212"/>

                {/* Rear paws */}
                <ellipse cx="184" cy="436" rx="25" ry="33" fill="#2A1212" opacity="0.88"/>
                <ellipse cx="328" cy="436" rx="25" ry="33" fill="#2A1212" opacity="0.88"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}
