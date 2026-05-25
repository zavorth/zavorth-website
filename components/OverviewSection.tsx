'use client'

export function OverviewSection() {
  const terminalLines = [
    { text: '$ zavorth run "analisar codigo.py"', type: 'command' },
    { text: '› Analisando intenção do comando...', type: 'info' },
    { text: '✓ Aprovado: Ação isolada em sandbox local.', type: 'success' },
    { text: '› Resolvendo modelo via Ollama (DeepSeek)...', type: 'info' },
    { text: '✓ Análise concluída com sucesso.', type: 'success' },
  ]

  return (
    <section id="overview" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow behind terminal */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.03) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase backdrop-blur-sm">
            <span className="terminal-status-dot relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Zavorth Runtime • Active
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Inteligência artificial executada localmente.
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          Zavorth é um runtime local e seguro que executa modelos de IA diretamente na sua máquina,
          sem enviar dados para a nuvem. Cada ação é isolada, auditada e assinada criptograficamente.
        </p>

        {/* Terminal Card */}
        <div className="relative mx-auto mt-14 max-w-2xl">
          <div className="terminal-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/50 shadow-2xl backdrop-blur-xl">
            {/* Scan line */}
            <div className="terminal-scanline pointer-events-none absolute inset-0 z-20" />

            {/* Terminal header */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              <span className="ml-3 font-mono text-[11px] tracking-wider text-neutral-600">
                zavorth.terminal
              </span>
            </div>

            {/* Terminal body */}
            <div className="relative min-h-[220px] p-5 text-left font-mono text-sm leading-7 sm:p-6 sm:text-[13px] sm:leading-8">
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className={`terminal-line terminal-line-${i} whitespace-pre-wrap ${
                    line.type === 'command'
                      ? 'text-white'
                      : line.type === 'success'
                        ? 'text-emerald-400'
                        : 'text-amber-400/80'
                  }`}
                >
                  {line.text}
                </div>
              ))}
              {/* Pulsing cursor */}
              <span className="terminal-cursor mt-1 inline-block text-amber-500">█</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Typing stagger animation */
        .terminal-line {
          opacity: 0;
          transform: translateY(6px);
          animation: terminalTyping 0.4s ease-out forwards;
        }
        .terminal-line-0 { animation-delay: 0.6s; }
        .terminal-line-1 { animation-delay: 1.4s; }
        .terminal-line-2 { animation-delay: 2.2s; }
        .terminal-line-3 { animation-delay: 3.0s; }
        .terminal-line-4 { animation-delay: 3.8s; }

        @keyframes terminalTyping {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Cursor blink */
        .terminal-cursor {
          opacity: 0;
          animation: cursorAppear 0.1s ease-out 4.4s forwards, cursorBlink 1s step-end 4.5s infinite;
        }

        @keyframes cursorAppear {
          to { opacity: 1; }
        }

        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Scan line */
        .terminal-scanline {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245, 158, 11, 0.03) 50%,
            transparent 100%
          );
          background-size: 100% 8px;
          animation: scanMove 4s linear infinite;
        }

        @keyframes scanMove {
          0% {
            background-position: 0 -100%;
          }
          100% {
            background-position: 0 200%;
          }
        }
      `}</style>
    </section>
  )
}
