'use client'

import React, { useState, useEffect, useRef } from 'react'

const PRESETS = [
  "Orquestre agentes autônomos em escala massiva.",
  "Segurança máxima com o protocolo criptográfico Zavorth.",
  "Conectando a infraestrutura de inteligência do futuro.",
  "Sinta a gravidade desaparecer na velocidade de escrita."
]

export function ZavorthPlayground() {
  const [inputText, setInputText] = useState(PRESETS[0])
  const [isTyping, setIsTyping] = useState(false)
  const typingContainerRef = useRef<HTMLDivElement>(null)
  const [activeTimeoutId, setActiveTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
    if (activeTimeoutId) {
      clearTimeout(activeTimeoutId)
      setActiveTimeoutId(null)
    }
  }

  const runTypingAnimation = (textToAnimate: string) => {
    clearAllTimeouts()

    if (!typingContainerRef.current) return

    const container = typingContainerRef.current
    const contentSpan = container.querySelector('.typed-content') as HTMLSpanElement
    const cursorContainer = container.querySelector('.cursor-container') as HTMLDivElement
    const bar = container.querySelector('.glowing-cursor-bar') as HTMLDivElement

    if (!contentSpan) return

    setIsTyping(true)

    // Clear content
    contentSpan.textContent = textToAnimate
    contentSpan.innerHTML = ''
    const chars: HTMLDivElement[] = []
    const words = textToAnimate.split(' ')

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('div')
      wordSpan.style.display = 'inline-block'
      wordSpan.style.position = 'relative'

      for (let i = 0; i < word.length; i++) {
        const charSpan = document.createElement('div')
        charSpan.className = 'char'
        charSpan.textContent = word[i]
        charSpan.style.opacity = '0'
        charSpan.style.display = 'inline-block'
        charSpan.style.position = 'relative'
        wordSpan.appendChild(charSpan)
        chars.push(charSpan)
      }

      contentSpan.appendChild(wordSpan)

      if (wordIdx < words.length - 1) {
        contentSpan.appendChild(document.createTextNode(' '))
      }
    })

    const updateBlinkingCursor = (x: number, y: number) => {
      container.style.setProperty('--cursor-pos-x', `${x}px`)
      container.style.setProperty('--cursor-pos-y', `${y}px`)
    }

    // Set initial position
    if (chars.length > 0) {
      const first = chars[0]
      const charRect = first.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      updateBlinkingCursor(
        charRect.left - containerRect.left,
        charRect.top - containerRect.top
      )
    }

    if (cursorContainer) {
      cursorContainer.style.opacity = '1'
      cursorContainer.classList.add('typing-active')
    }

    const staggerSpeed = 0.05
    const staggerMs = staggerSpeed * 1000
    let cumulativeDelay = 150

    chars.forEach((char, i) => {
      const charText = char.textContent
      let charDelay = staggerMs

      if (charText === ' ') {
        charDelay = staggerMs * 1.6
      } else if (/[.,?!;:-]/.test(charText || '')) {
        charDelay = staggerMs * 4.0
      }
      charDelay = charDelay * (0.9 + Math.random() * 0.2)

      const t = setTimeout(() => {
        char.style.opacity = '1'

        const charRect = char.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        updateBlinkingCursor(
          (charRect.left - containerRect.left) + charRect.width + 10,
          charRect.top - containerRect.top
        )

        // Pulsing cursor bloom on active keystroke
        if (bar) {
          bar.style.boxShadow = '0 0 14px rgba(6, 182, 212, 1), 0 0 28px rgba(256, 256, 256, 1)'
          bar.style.transform = 'scale(1.15)'
          const tPulse = setTimeout(() => {
            bar.style.boxShadow = '0 0 6px rgba(6, 182, 212, 0.6), 0 0 12px rgba(139, 92, 246, 0.4)'
            bar.style.transform = 'scale(1)'
          }, 85)
          timeoutsRef.current.push(tPulse)
        }

        if (i === chars.length - 1) {
          setIsTyping(false)
          if (cursorContainer) {
            cursorContainer.classList.remove('typing-active')
            cursorContainer.style.opacity = '0'
          }
        }
      }, cumulativeDelay)

      timeoutsRef.current.push(t)
      cumulativeDelay += charDelay
    })
  }

  // Trigger animation on text change with debounce
  useEffect(() => {
    if (!inputText.trim()) return

    // Debounce typing run
    const handler = setTimeout(() => {
      runTypingAnimation(inputText)
    }, 600)

    setActiveTimeoutId(handler)

    return () => {
      clearTimeout(handler)
      clearAllTimeouts()
    }
  }, [inputText])

  // Cleanup on unmount
  useEffect(() => {
    return () => clearAllTimeouts()
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12 select-none relative z-20">
      <div className="bg-zinc-950/65 border border-white/10 rounded-2xl backdrop-blur-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Zavorth Liquid Motion
            </h3>
            <p className="text-sm text-zinc-400 mt-1">
              Escreva qualquer comando ou frase e sinta a física elástica do cursor neon em tempo real.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isTyping ? 'bg-cyan-400' : 'bg-green-400'}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isTyping ? 'bg-cyan-500' : 'bg-green-500'}`} />
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              {isTyping ? 'SISTEMA DIGITANDO' : 'PRONTO PARA ENTRADA'}
            </span>
          </div>
        </div>

        {/* Input Control Console */}
        <div className="space-y-4 mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg blur opacity-15 group-hover:opacity-25 transition duration-300" />
            <div className="relative bg-zinc-900 border border-white/10 rounded-lg flex items-center px-4 py-3">
              <span className="text-cyan-400 font-mono text-sm mr-3 select-none">zavorth &gt;</span>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Insira seu texto aqui..."
                className="bg-transparent border-none outline-none text-white w-full font-mono text-sm sm:text-base focus:ring-0 placeholder:text-zinc-600"
              />
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="text-zinc-500 hover:text-white transition-colors ml-2"
                  title="Limpar campo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-zinc-500 font-medium">Sugestões rápidas:</span>
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setInputText(preset)}
                className={`text-xs px-3 py-1.5 rounded-full border border-white/5 bg-white/[0.03] transition-all hover:bg-white/[0.08] hover:border-white/20 text-zinc-300 ${inputText === preset ? 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300' : ''}`}
              >
                Preset {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Live Liquid Canvas Output */}
        <div className="bg-[#030303] border border-white/[0.08] rounded-xl p-6 sm:p-8 min-h-[180px] flex items-center justify-center relative overflow-hidden group/output">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          <div className="text-center w-full relative z-10 flex justify-center">
            <div ref={typingContainerRef} className="typed-container select-text text-white text-base sm:text-xl md:text-2xl font-bold tracking-tight leading-relaxed max-w-2xl">
              <div className="cursor-container">
                <div className="glowing-cursor-bar" />
              </div>
              <span className="typed-content" />
            </div>
          </div>

          {/* Re-trigger action */}
          <button
            onClick={() => runTypingAnimation(inputText)}
            disabled={!inputText.trim()}
            className="absolute bottom-3 right-3 text-xs bg-zinc-900 border border-white/10 rounded px-2.5 py-1 text-zinc-400 opacity-0 group-hover/output:opacity-100 transition-opacity duration-200 hover:text-white hover:border-white/20 disabled:pointer-events-none"
          >
            Re-digitar ⟳
          </button>
        </div>
      </div>
    </div>
  )
}
