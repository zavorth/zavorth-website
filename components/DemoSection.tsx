'use client'

import React, { useLayoutEffect, useRef } from 'react'
import {
  ArrowRight,
  CheckCircle2,
  FileSearch,
  GitBranch,
  Lock,
  Play,
  Terminal,
} from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins } from './motion'

const flow = [
  {
    label: 'Entende',
    title: 'Pedido em linguagem natural',
    desc: 'Voce pede uma entrega real, nao uma resposta solta.',
  },
  {
    label: 'Planeja',
    title: 'Plano curto e verificavel',
    desc: 'O Basilisk separa contexto, risco, ferramentas e proximos passos.',
  },
  {
    label: 'Pede sinal',
    title: 'Preview antes de mutar',
    desc: 'Mudancas sensiveis aparecem antes de tocar no sistema.',
  },
  {
    label: 'Entrega',
    title: 'Execucao com evidencia',
    desc: 'Comandos, testes e resultado ficam no mesmo rastro.',
  },
]

const promises = [
  { icon: Lock, label: 'Local-first', text: 'Seu PC continua sendo o centro.' },
  { icon: GitBranch, label: 'Com controle', text: 'Acoes importantes passam por preview.' },
  { icon: FileSearch, label: 'Com rastro', text: 'Cada entrega deixa evidencia legivel.' },
]

export function DemoSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-product-header]', {
        trigger: rootRef.current!,
        start: 'top 78%',
        y: 18,
        duration: 0.8,
      })
      createReveal('[data-product-item]', {
        trigger: '[data-product-content]',
        start: 'top 82%',
        y: 18,
        duration: 0.75,
        stagger: 0.07,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="product" ref={rootRef} className="relative section-rhythm product-demo-section">
      <div className="section-divider max-w-content mx-auto mb-14 lg:mb-18" />

      <div className="max-w-6xl mx-auto px-6">
        <div data-product-header className="text-center mb-10 md:mb-12">
          <p className="eyebrow mb-4 justify-center mx-auto">01 - Produto</p>
          <h2 className="section-title-display text-heading sm:text-display-sm text-neutral-50 mb-5">
            Um pedido vira <span className="signal-text">trabalho entregue.</span>
          </h2>
          <p className="section-lead text-body-lg text-neutral-500 leading-relaxed">
            O Basilisk conecta conversa, contexto, ferramentas e aprovacao em um
            unico loop local.
          </p>
        </div>

        <div data-product-content className="product-demo-shell">
          <div className="product-demo-request" data-product-item>
            <div className="product-demo-request__top">
              <span>
                <Terminal size={15} />
                Pedido
              </span>
              <b>local</b>
            </div>
            <p>
              Corrija o erro do build, rode os testes e me mostre exatamente o
              que mudou.
            </p>
          </div>

          <div className="product-demo-flow" aria-label="Fluxo resumido do Basilisk">
            {flow.map((step, index) => (
              <article key={step.label} className="product-demo-step" data-product-item>
                <span className="product-demo-step__index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p>{step.label}</p>
                  <h3>{step.title}</h3>
                  <small>{step.desc}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="product-demo-result" data-product-item>
            <div className="product-demo-result__status">
              <span>
                <CheckCircle2 size={15} />
                Pronto para revisar
              </span>
              <b>3m 24s</b>
            </div>

            <div className="product-demo-result__body">
              <p>Patch criado no branch seguro.</p>
              <ul>
                <li>2 arquivos alterados</li>
                <li>build validado</li>
                <li>resumo com evidencia</li>
              </ul>
            </div>

            <span className="product-demo-result__action">
              Aprovar execucao
              <Play size={14} />
            </span>
          </div>
        </div>

        <div className="product-demo-promises" data-product-item>
          {promises.map((item) => {
            const Icon = item.icon

            return (
              <div key={item.label} className="product-demo-promise">
                <Icon size={16} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.text}</small>
                </span>
              </div>
            )
          })}
          <div className="product-demo-promise product-demo-promise--accent">
            <span>
              <strong>Sem virar manual</strong>
              <small>O site mostra o produto em acao, e a doc fica para o detalhe.</small>
            </span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </section>
  )
}
