'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import {
  Terminal,
  Send,
  Sparkles,
  Database,
  Cpu,
  ShieldCheck,
  ShieldAlert,
  Wrench,
  CheckSquare,
  FileCheck,
  Brain,
  Eye
} from 'lucide-react'

// Scenarios data representing Zavorth Agent Engine in action
const scenarios = [
  {
    id: "saas",
    label: "Deploy Automático",
    prompt: "zavorth compile e deploy do microserviço de agendamento",
    agents: [
      {
        agent: "planner",
        name: "planning-engine",
        task: "Plano & Segurança",
        dur: "12s",
        feed: ["Read schema", "Check permissions"],
        children: [
          { agent: "compiler", name: "zavorth-compiler", task: "Compilar código", dur: "7s", feed: ["transpile TS", "✓ compilado"] },
          { agent: "security", name: "security-audit", task: "Checar sandbox", dur: "4s", feed: ["sandbox ok", "✓ seguro"] }
        ]
      },
      {
        agent: "runtime",
        name: "runtime-manager",
        task: "Ambiente Isolado",
        dur: "15s",
        feed: ["Init Docker VM", "Run microservice"],
        children: [
          { agent: "sandboxed-vm", name: "sandbox-vm", task: "Sandbox local", dur: "10s", feed: ["port 8080 active", "✓ pronto"] },
          { agent: "deployer", name: "git-deployer", task: "Deploy Git", dur: "5s", feed: ["git push prod", "✓ online"] }
        ]
      }
    ]
  },
  {
    id: "bug",
    label: "Corrigir Falhas",
    prompt: "zavorth auditar dependências e corrigir brechas no repo",
    agents: [
      {
        agent: "scanner",
        name: "cve-scanner",
        task: "Varredura AST",
        dur: "9s",
        feed: ["bash npm audit", "AST match"],
        children: [
          { agent: "cve-db", name: "cve-database", task: "Banco de vulnerabilidades", dur: "5s", feed: ["sync CVE db", "exit 0"] },
          { agent: "fixer", name: "auto-patcher", task: "Gerar patches", dur: "4s", feed: ["apply patch", "✓ corrigido"] }
        ]
      },
      {
        agent: "verifier",
        name: "qa-verification",
        task: "Verificar testes",
        dur: "14s",
        feed: ["run test suite", "check regressions"],
        children: [
          { agent: "unit-tests", name: "test-runner", task: "Testes unitários", dur: "9s", feed: ["eslint review", "✓ 14 pass"] },
          { agent: "logger", name: "audit-receipts", task: "Recibos assinados", dur: "5s", feed: ["generate receipt", "✓ assinado"] }
        ]
      }
    ]
  },
  {
    id: "api",
    label: "Integração API",
    prompt: "zavorth conectar webhook do Telegram com banco SQLite",
    agents: [
      {
        agent: "codegen",
        name: "code-generator",
        task: "Gerar schemas",
        dur: "11s",
        feed: ["Read API spec", "Gen TS types"],
        children: [
          { agent: "db-migration", name: "db-engine", task: "Migrar banco", dur: "6s", feed: ["sqlite migrate", "✓ ok"] },
          { agent: "telegram", name: "telegram-binder", task: "Telegram bridge", dur: "5s", feed: ["setup webhook", "✓ pronto"] }
        ]
      },
      {
        agent: "logger",
        name: "monitoring-hub",
        task: "Logs e monitoramento",
        dur: "12s",
        feed: ["Init connection", "Set audit channel"],
        children: [
          { agent: "discord", name: "alert-gateway", task: "Gateway Discord", dur: "8s", feed: ["discord alerts", "✓ active"] },
          { agent: "signed-receipts", name: "cripto-receipts", task: "Assinatura local", dur: "4s", feed: ["sign local receipt", "✓"] }
        ]
      }
    ]
  },
  {
    id: "tokens",
    label: "Economia de Tokens",
    prompt: "distribua tarefas pesadas usando Ollama e Gemini locais",
    alert: "ollama ativo · Llama3 8b · 0ms latência local",
    agents: [
      {
        agent: "ollama",
        name: "ollama-service",
        task: "Execução offline",
        dur: "16s",
        feed: ["llama3 running", "local execution"],
        children: [
          { agent: "gemini", name: "gemini-flash", task: "Processamento rápido", dur: "10s", feed: ["gemini flash spec", "exit 0"] },
          { agent: "local-cache", name: "smart-cache", task: "Cache inteligente", dur: "5s", feed: ["hit rate: 84%", "✓ ok"] }
        ]
      },
      {
        agent: "orchestrator",
        name: "token-router",
        task: "Roteador inteligente",
        dur: "14s",
        feed: ["analyze token cost", "route request"],
        children: [
          { agent: "claude", name: "claude-sonnet", task: "Modelo complexo", dur: "9s", feed: ["claude sonnet call", "✓ ready"] },
          { agent: "cost-limiter", name: "limit-control", task: "Limite de gastos", dur: "5s", feed: ["cost limit ok", "✓ limit"] }
        ]
      }
    ]
  }
]

// Flatten agents hierarchy helper
function flattenAgents(scenario: typeof scenarios[0]) {
  const result: any[] = []
  // Adjusted positions to keep them spacious and beautifully aligned on the grid
  const tier1Positions = [28, 72]
  const tier2Positions = [[14, 40], [60, 86]]

  scenario.agents.forEach((agent, i) => {
    const parentKey = `p${i}`
    result.push({
      ...agent,
      key: parentKey,
      tier: 1,
      x: tier1Positions[i],
      top: 54 // Shifted down to accommodate the header tabs
    })
    agent.children.forEach((child, j) => {
      result.push({
        ...child,
        key: `${parentKey}-${j}`,
        tier: 2,
        parent: parentKey,
        x: tier2Positions[i][j],
        top: 82 // Shifted down to accommodate the header tabs
      })
    })
  })
  return result
}

// Icon helper function
function renderAgentIcon(agent: string) {
  const size = 12
  switch (agent) {
    case 'planner':
    case 'orchestrator':
      return <Sparkles size={size} />
    case 'compiler':
    case 'codegen':
      return <Terminal size={size} />
    case 'security':
    case 'cost-limiter':
      return <ShieldAlert size={size} />
    case 'runtime':
    case 'sandboxed-vm':
      return <Cpu size={size} />
    case 'deployer':
    case 'telegram':
    case 'discord':
      return <Send size={size} />
    case 'scanner':
      return <Eye size={size} />
    case 'cve-db':
    case 'db-migration':
      return <Database size={size} />
    case 'fixer':
      return <Wrench size={size} />
    case 'verifier':
    case 'unit-tests':
      return <CheckSquare size={size} />
    case 'logger':
    case 'signed-receipts':
      return <FileCheck size={size} />
    default:
      return <Brain size={size} />
  }
}

// Color helper function
function getAgentColor(agent: string) {
  switch (agent) {
    case 'planner':
    case 'orchestrator':
      return '#00e88f' // Zavorth green
    case 'compiler':
    case 'codegen':
      return '#3b82f6' // Blue
    case 'security':
    case 'cost-limiter':
      return '#ef4444' // Red
    case 'runtime':
    case 'sandboxed-vm':
      return '#a78bfa' // Purple
    case 'deployer':
    case 'telegram':
    case 'discord':
      return '#fbbf24' // Yellow
    case 'scanner':
    case 'cve-db':
    case 'fixer':
      return '#14b8a6' // Teal
    case 'verifier':
    case 'unit-tests':
      return '#6366f1' // Indigo
    case 'logger':
    case 'signed-receipts':
      return '#ec4899' // Pink
    default:
      return '#00e88f'
  }
}

export function ConnectionsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const leadRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0)
  const [phase, setPhase] = useState<'input' | 'dispatch' | 'run' | 'done'>('input')
  const [typedText, setTypedText] = useState('')
  const [isPlanning, setIsPlanning] = useState(false)
  const [shownCards, setShownCards] = useState<{ [key: string]: boolean }>({})
  const [cardStatus, setCardStatus] = useState<{ [key: string]: 'idle' | 'running' | 'done' }>({})
  const [edges, setEdges] = useState<any[]>([])
  const [hasIntersected, setHasIntersected] = useState(false)
  const [isUserHovering, setIsUserHovering] = useState(false)
  const cancelledRef = useRef(false)

  const activeScenario = scenarios[activeScenarioIdx]
  const flatAgentsList = flattenAgents(activeScenario)

  // Edge drawing logic
  const recalculateEdges = useCallback((shown: typeof shownCards, status: typeof cardStatus) => {
    const container = containerRef.current
    const lead = leadRef.current
    if (!container || !lead) return

    const containerRect = container.getBoundingClientRect()
    const getPos = (element: HTMLElement, offsetTop: boolean) => {
      const rect = element.getBoundingClientRect()
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + (offsetTop ? 0 : rect.height)
      }
    }

    const leadPos = getPos(lead, false)
    const newEdges: any[] = []

    flatAgentsList.forEach(agent => {
      if (!shown[agent.key]) return
      const cardEl = cardRefs.current[agent.key]
      if (!cardEl) return

      const parentPos = agent.tier === 1 
        ? leadPos 
        : (cardRefs.current[agent.parent] ? getPos(cardRefs.current[agent.parent]!, false) : leadPos)
      const childPos = getPos(cardEl, true)

      const midY = (parentPos.y + childPos.y) / 2
      const statusVal = status[agent.key] || 'idle'
      let edgeClass = 'edge'
      if (statusVal === 'done') {
        edgeClass += ' done'
      } else if (statusVal === 'running') {
        edgeClass += ' flow'
      }

      newEdges.push({
        key: agent.key,
        d: `M ${parentPos.x} ${parentPos.y} C ${parentPos.x} ${midY}, ${childPos.x} ${midY}, ${childPos.x} ${childPos.y}`,
        cls: edgeClass
      })
    })

    setEdges(newEdges)
  }, [flatAgentsList])

  // Scroll visibility checker
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHasIntersected(true)
          observer.disconnect()
        }
      })
    }, { threshold: 0.25 })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Handle resizing and dynamic positioning
  useEffect(() => {
    const handleResize = () => recalculateEdges(shownCards, cardStatus)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [shownCards, cardStatus, recalculateEdges])

  useEffect(() => {
    recalculateEdges(shownCards, cardStatus)
  }, [shownCards, cardStatus, recalculateEdges])

  // Core Simulation Timeline
  useEffect(() => {
    if (!hasIntersected) return

    cancelledRef.current = false
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const runSimulation = async () => {
      if (cancelledRef.current) return

      // Reset states
      setPhase('input')
      setTypedText('')
      setIsPlanning(false)
      setShownCards({})
      setCardStatus({})
      
      const prompt = activeScenario.prompt

      // 1. Type prompt
      for (let i = 1; i <= prompt.length; i++) {
        if (cancelledRef.current) return
        setTypedText(prompt.substring(0, i))
        await sleep(35)
      }

      await sleep(500)
      if (cancelledRef.current) return

      // 2. Planning
      setIsPlanning(true)
      await sleep(1200)
      if (cancelledRef.current) return

      // 3. Dispatch (fades out prompt, shows lead node)
      setPhase('dispatch')
      setIsPlanning(false)
      await sleep(650)
      if (cancelledRef.current) return

      // 4. Reveal Tier 1 agents
      const tier1 = flatAgentsList.filter(a => a.tier === 1)
      const tier2 = flatAgentsList.filter(a => a.tier === 2)

      for (const agent of tier1) {
        if (cancelledRef.current) return
        setShownCards(prev => ({ ...prev, [agent.key]: true }))
        await sleep(250)
      }

      // 5. Reveal Tier 2 agents
      for (const agent of tier2) {
        if (cancelledRef.current) return
        setShownCards(prev => ({ ...prev, [agent.key]: true }))
        await sleep(200)
      }

      await sleep(400)
      if (cancelledRef.current) return

      // 6. Run phase (edges pulse with amber flowing light)
      setPhase('run')
      setCardStatus(Object.fromEntries(flatAgentsList.map(a => [a.key, 'running'])))
      await sleep(1800)
      if (cancelledRef.current) return

      // 7. Success phase (agents finish tasks and edges turn solid green)
      setPhase('done')
      const totalCount = flatAgentsList.length
      const shuffledList = [...tier2, ...tier1] // Children finish first, then parents

      for (let i = 0; i < totalCount; i++) {
        if (cancelledRef.current) return
        const agent = shuffledList[i]
        setCardStatus(prev => ({ ...prev, [agent.key]: 'done' }))
        await sleep(350)
      }

      // Hold finished state
      await sleep(3500)

      // Cycle to next scenario if user is not hovering
      if (!cancelledRef.current && !isUserHovering) {
        setActiveScenarioIdx(prev => (prev + 1) % scenarios.length)
      }
    }

    runSimulation()

    return () => {
      cancelledRef.current = true
    }
  }, [hasIntersected, activeScenarioIdx, isUserHovering])

  const runningCount = Object.values(cardStatus).filter(v => v === 'running').length
  const doneCount = Object.values(cardStatus).filter(v => v === 'done').length

  return (
    <section
      id="connections"
      className="landing-surface-soft relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.015] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header Block */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:gap-12 text-left">
          <div className="w-full md:w-1/3">
            <span className="section-kicker">Orquestração</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
              Plano de Controle <br />
              <span className="text-emerald-400">e Integrações</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg font-light leading-relaxed text-neutral-300">
              O Zavorth gerencia e despacha subprocessos locais estruturados em rede. Cada tarefa é dividida em subprocessos isolados em sandbox com logs e recibos criptográficos gerados localmente.
            </p>
          </div>
        </div>

        {/* Live Canvas Area */}
        <div className="canvas-sec rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_30px_70px_rgba(0,0,0,0.55)]">
          <div className="canvas" ref={containerRef}>
            <span className="brk-overlay" />
            <div className="cv-grid" />

            {/* Top scenario selectors (Floating Tab Bar) */}
            <div
              className="usecase"
              style={{
                bottom: 'auto',
                top: 0,
                borderTop: 'none',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(10, 10, 12, 0.95)'
              }}
              onMouseEnter={() => setIsUserHovering(true)}
              onMouseLeave={() => setIsUserHovering(false)}
            >
              <span className="uc-label">casos de uso</span>
              {scenarios.map((sc, idx) => (
                <button
                  key={sc.id}
                  type="button"
                  className={`uc-chip ${idx === activeScenarioIdx ? 'on' : ''}`}
                  onClick={() => {
                    setActiveScenarioIdx(idx)
                  }}
                  aria-pressed={idx === activeScenarioIdx}
                >
                  {sc.label}
                </button>
              ))}
            </div>

            {/* Stats Dashboard header */}
            <div className="ac-top" style={{ top: '64px' }}>
              <span className="cv-stat">
                <i className="run" />
                {runningCount} ativos
              </span>
              <span className="cv-stat">
                <i className="done" />
                {doneCount} concluídos
              </span>
              <span className="cv-port">
                {phase === 'input' 
                  ? (isPlanning ? 'planejando o plano de execução...' : 'processando comando natural...')
                  : phase === 'dispatch' ? 'inicializando pipelines locais...'
                  : phase === 'run' ? 'agentes em execução paralela...'
                  : '✓ pipeline concluído com sucesso'}
              </span>
            </div>

            {/* Bezier connection lines */}
            <svg className="cv-edges">
              {edges.map(edge => (
                <path key={edge.key} className={edge.cls} d={edge.d} pathLength={1} />
              ))}
            </svg>

            {/* Central Node (lead) */}
            <div
              ref={leadRef}
              className={`lead ${phase !== 'input' ? 'in' : ''} ${phase !== 'input' && phase !== 'done' ? 'active' : ''}`}
              style={{ left: '50%', top: '27%' }}
            >
              <div className="grid h-6 w-6 place-items-center bg-emerald-500/10 border border-emerald-500/30 rounded">
                <Cpu className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="text-left">
                <b>zavorth-core</b>
                <span className="path">~/zavorth-engine</span>
              </div>
              <i className={`led ${phase === 'done' ? 'done' : (phase !== 'input' && phase !== 'dispatch' ? 'active' : '')}`} />
            </div>

            {/* Agent Nodes cards */}
            {flatAgentsList.map(agent => {
              const shown = shownCards[agent.key]
              const status = cardStatus[agent.key] || 'idle'
              const color = getAgentColor(agent.agent)

              return (
                <div
                  key={agent.key}
                  ref={el => { cardRefs.current[agent.key] = el }}
                  className={`acard ${shown ? 'show' : ''} ${agent.tier === 2 ? 't2' : ''} ${status === 'running' ? 's-run' : (status === 'done' ? 's-done' : 's-idle')}`}
                  style={{
                    left: `${agent.x}%`,
                    top: `${agent.top}%`,
                    borderColor: status === 'done' ? '#00e88f' : (status === 'running' ? '#fbbf24' : 'rgba(255,255,255,0.08)'),
                    boxShadow: status === 'done' 
                      ? '0 4px 15px rgba(0, 232, 143, 0.08)' 
                      : (status === 'running' ? '0 4px 15px rgba(245, 158, 11, 0.08)' : 'none')
                  }}
                >
                  <div className="ac-head">
                    <span className="ac-ico" style={{ color }}>
                      {renderAgentIcon(agent.agent)}
                    </span>
                    <span className="ac-name">{agent.name}</span>
                    <span className={`badge ${status}`}>
                      {status === 'done' ? agent.dur : (status === 'running' ? 'run' : 'fila')}
                    </span>
                  </div>
                  <div className="ac-task">{agent.task}</div>
                  <div className="feed">
                    {agent.feed.map((f: string, idx: number) => (
                      <div key={idx} className="fl">{f}</div>
                    ))}
                  </div>
                </div>
              )
            })}

            {/* Typing prompt overlay window */}
            <div className={`ac-intro ${phase === 'input' ? '' : 'gone'}`} style={{ top: '27%' }}>
              <div className="ac-intro-inner">
                <div className="ac-prompt">
                  <span className="ac-chev">❯</span>
                  <span className="ac-typed">{typedText}</span>
                  {!isPlanning && <span className="cur" />}
                  {isPlanning && <span className="ac-dots" aria-label="planejando" />}
                </div>

                {activeScenario.alert && typedText.length > 4 && (
                  <div className="ac-alert">
                    <span className="ac-alert-ico">⚠</span>
                    {activeScenario.alert}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
