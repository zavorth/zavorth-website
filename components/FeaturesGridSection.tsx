'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Premium terminal demos — denser chrome & content (product-window feel),
 * Zavorth-specific copy, unique bento layout.
 */

function Traffic() {
  return (
    <span className="zt2-traffic" aria-hidden>
      <i className="r" />
      <i className="y" />
      <i className="g" />
    </span>
  )
}

function LiveCursor() {
  return <span className="zt2-cur" aria-hidden />
}

function useTypeLine(full: string, delay = 400, speed = 26) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const start = setTimeout(() => {
      const tick = () => {
        i += 1
        setOut(full.slice(0, i))
        if (i < full.length) t = setTimeout(tick, speed)
      }
      tick()
    }, delay)
    return () => {
      clearTimeout(start)
      clearTimeout(t)
    }
  }, [full, delay, speed])
  return out
}

function TermChrome({
  title,
  path,
  children,
  footer,
  glow,
  badge,
}: {
  title: string
  path?: string
  children: React.ReactNode
  footer?: React.ReactNode
  glow?: boolean
  badge?: string
}) {
  return (
    <div className={`zt2-window ${glow ? 'glow' : ''}`}>
      <div className="zt2-titlebar">
        <Traffic />
        <span className="zt2-title">{title}</span>
        {path ? <span className="zt2-path">{path}</span> : null}
        {badge ? <span className="zt2-badge">{badge}</span> : null}
        <span className="zt2-led" title="online" />
      </div>
      <div className="zt2-body font-mono">
        <div className="zt2-body-inner">{children}</div>
      </div>
      {footer ? <div className="zt2-foot font-mono">{footer}</div> : null}
    </div>
  )
}

function CardRuntime() {
  const line = useTypeLine('npx zavorth start', 500, 32)
  const done = line.length >= 'npx zavorth start'.length
  return (
    <TermChrome title="zavorth-runtime" path="~/zavorth" glow badge="local">
      <div className="zt2-line mute"># portable-pty · session ses-a1</div>
      <div className="zt2-line dim">pty#a1 attached · scrollback on disk</div>
      <div className="zt2-line">
        <span className="ps">PS ~&gt;</span> <span className="cmd">{line}</span>
        {!done ? <LiveCursor /> : null}
      </div>
      {done ? (
        <>
          <div className="zt2-line dim">  resolving zavorth@latest …</div>
          <div className="zt2-line ok">✓ [Zavorth] Runtime governado ativo</div>
          <div className="zt2-line ok">✓ gateway :33333 · 24ms</div>
          <div className="zt2-line ok">✓ policy gate · approvals on</div>
          <div className="zt2-line">
            <span className="prompt">❯</span> <LiveCursor />
          </div>
        </>
      ) : null}
    </TermChrome>
  )
}

function CardTrustLoop() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 6), 1400)
    return () => clearInterval(id)
  }, [])
  const lines = [
    { text: '❯ zavorth run "organize invoices/"', cls: 'cmd' },
    { text: '  intent captured · dashboard', cls: 'dim' },
    { text: '→ plan.md · 6 passos · risco write', cls: 'dim' },
    { text: '⏸ portão · aguardando operador', cls: 'wait' },
    { text: '✓ aprovado · sandbox exit 0', cls: 'ok' },
    { text: '✓ receipt sha256 · data/runtime/', cls: 'ok' },
  ]
  return (
    <TermChrome
      title="zavorth"
      path="trust-loop"
      badge="gate"
      footer={
        <>
          <span className="ok">⟫⟫ trust loop ativo</span>
          <span className="dim">approvals: on · shift+tab</span>
        </>
      }
    >
      {lines.map((l, i) => (
        <div key={l.text} className={`zt2-line ${l.cls} ${i > step ? 'faint' : ''}`}>
          {l.text}
        </div>
      ))}
      {step === 3 ? (
        <div className="zt2-gate">
          <span>APROVAR</span>
          <span className="ghost">REJEITAR</span>
          <span className="ghost">EDITAR</span>
        </div>
      ) : null}
    </TermChrome>
  )
}

function CardStack() {
  return (
    <div className="zt2-stack">
      <div className="zt2-stack-back">
        <TermChrome title="channel-bridge" path="~/channels" badge="bg">
          <div className="zt2-line mute"># background container</div>
          <div className="zt2-line dim">pty#b2 attached · not killed</div>
          <div className="zt2-line">
            <span className="prompt">❯</span> telegram listening…
          </div>
          <div className="zt2-line ok">✓ webhook up · idle</div>
        </TermChrome>
      </div>
      <div className="zt2-stack-front">
        <TermChrome title="zavorth-runtime" path="~/zavorth" glow badge="fg">
          <div className="zt2-line mute"># foreground · same gate</div>
          <div className="zt2-line">
            <span className="prompt">❯</span> running listener…
          </div>
          <div className="zt2-line ok">✓ gateway online in 24ms</div>
          <div className="zt2-line ok">✓ policy shared with channel-bridge</div>
        </TermChrome>
      </div>
    </div>
  )
}

function CardAgents() {
  const tabs = [
    {
      id: 'planner',
      body: (
        <>
          <div className="zt2-line mute"># superfície planner</div>
          <div className="zt2-line">
            <span className="prompt">❯</span> zavorth chat &quot;analise o repo&quot;
          </div>
          <div className="zt2-line dim">  indexing workspace… 128 files</div>
          <div className="zt2-line ok">✓ plano local · 4 passos · risk low</div>
          <div className="zt2-line ok">✓ sem writes · só leitura</div>
        </>
      ),
    },
    {
      id: 'sandbox',
      body: (
        <>
          <div className="zt2-line mute"># superfície sandbox</div>
          <div className="zt2-line dim">isolado · sem rede · tmpfs</div>
          <div className="zt2-line">
            <span className="prompt">❯</span> run step 2 of plan
          </div>
          <div className="zt2-line ok">✓ policy gate ready</div>
          <div className="zt2-line ok">✓ exit 0 · receipt queued</div>
        </>
      ),
    },
    {
      id: 'channel',
      body: (
        <>
          <div className="zt2-line mute"># superfície canal</div>
          <div className="zt2-line">
            <span className="prompt">❯</span> telegram-bridge status
          </div>
          <div className="zt2-line dim">  webhook · lag 12ms</div>
          <div className="zt2-line ok">✓ online · receipts on</div>
          <div className="zt2-line ok">✓ outbound gated</div>
        </>
      ),
    },
  ]
  const [tab, setTab] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTab((t) => (t + 1) % tabs.length), 2400)
    return () => clearInterval(id)
  }, [tabs.length])

  return (
    <TermChrome title="zavorth" path="3 superfícies" badge="mesh">
      <div className="zt2-tabs">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={i === tab ? 'on' : ''}
            onClick={() => setTab(i)}
          >
            {t.id}
          </button>
        ))}
      </div>
      <div className="zt2-pane">{tabs[tab].body}</div>
      <div className="zt2-line ok">✓ orquestrados sob um portão</div>
    </TermChrome>
  )
}

function CardSessions() {
  return (
    <TermChrome
      title="zavorth"
      path="~/.zavorth/sessions"
      badge="disk"
      footer={
        <>
          <span className="ok">⟫⟫ continuity</span>
          <span className="dim">2 sessions · 45 msgs</span>
        </>
      }
    >
      <div className="zt2-line mute"># sessões no disco · retomáveis</div>
      <div className="zt2-sess">
        <span className="id">a1b2</span>
        <span className="meta">14:31</span>
        <span className="meta">38 msgs</span>
        <span className="tag ok">receipts</span>
      </div>
      <div className="zt2-sess">
        <span className="id">c3d4</span>
        <span className="meta">11:02</span>
        <span className="meta">7 msgs</span>
        <span className="tag wait">gated</span>
      </div>
      <div className="zt2-line">
        <span className="prompt">❯</span> zavorth resume ses-9a8b
      </div>
      <div className="zt2-line dim">  restoring context · tools · receipts…</div>
      <div className="zt2-line ok">✓ sessão retomada · contexto intacto</div>
    </TermChrome>
  )
}

const features: Array<{
  id: string
  kicker: string
  title: string
  body: string
  demo: React.ReactNode
  wide?: boolean
}> = [
  {
    id: 'stack',
    kicker: 'workspace',
    title: 'Multi-container',
    body: 'Feche o painel sem matar os PTYs. O runtime segue no background com o mesmo gate.',
    demo: <CardStack />,
  },
  {
    id: 'pty',
    kicker: 'pty real',
    title: 'Terminais de verdade',
    body: 'PTY local, scrollback em disco e trust loop visível no rodapé — não um fake de IDE.',
    demo: <CardTrustLoop />,
  },
  {
    id: 'runtime',
    kicker: 'boot',
    title: 'Runtime governado',
    body: 'Um comando. Gateway local. Aprovações e receipts desde o primeiro start.',
    demo: <CardRuntime />,
  },
  {
    id: 'agents',
    kicker: 'superfícies',
    title: 'Planner · sandbox · canal',
    body: 'Três superfícies no mesmo shell, cada uma com PTY e policy compartilhados.',
    demo: <CardAgents />,
  },
  {
    id: 'sessions',
    kicker: 'continuidade',
    title: 'Sessões que voltam',
    body: 'Retome por session-id com contexto e recibos no disco.',
    demo: <CardSessions />,
    wide: true,
  },
]

export function FeaturesGridSection() {
  return (
    <section
      id="features"
      className="zt2-section relative border-t border-white/[0.06] bg-black py-24 sm:py-32 scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(0,232,143,0.07),transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="section-kicker">Superfícies do runtime</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Terminais que <span className="text-emerald-400">mostram o gate</span>
          </h2>
          <p className="mt-4 text-base leading-7 text-neutral-400">
            Chrome de produto, PTY real e o trust loop do Zavorth — não um grid genérico de multi-agente.
          </p>
        </div>

        <div className="zt2-grid">
          {features.map((f, i) => (
            <motion.article
              key={f.id}
              className={`zt2-card ${f.wide ? 'wide' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <div className="zt2-card-head">
                <span className="zt2-kicker">{f.kicker}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
              <div className="zt2-card-demo">{f.demo}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
