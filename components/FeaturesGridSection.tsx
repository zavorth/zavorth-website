'use client'

import React from 'react'

const abilities = [
  {
    num: '01',
    name: 'Habilidades sob demanda',
    text: 'Capacidades programáveis que você acopla ao runtime — permitindo manipulação de arquivos, comandos de terminal ou fluxos autônomos.',
  },
  {
    num: '02',
    name: 'Aprendizado contínuo',
    text: 'Cada plano aprovado e executado enriquece o contexto do agente. Ele reutiliza aprendizados para simplificar os próximos passos de forma autônoma.',
  },
  {
    num: '03',
    name: 'Memória persistente',
    text: 'Seus dados, histórico de execução e aprendizados são armazenados localmente. Você decide quando limpar, expurgar ou compartilhar.',
  },
  {
    num: '04',
    name: 'Retomada de Sessão',
    text: 'O runtime armazena o estado das tarefas de forma transacional. Se a execução for interrompida, retome exatamente de onde parou sem perda de estado.',
  },
  {
    num: '05',
    name: 'Canais Autorizados',
    text: 'Zavorth escuta e responde via Telegram, Web e CLI, porém a governança local sempre filtra e bloqueia ações que exijam aprovação do operador.',
  },
  {
    num: '06',
    name: 'Trilhas de Auditoria',
    text: 'Toda alteração gera um log estruturado em disco local. O agente assina criptograficamente o histórico para assegurar integridade contra adulteração.',
  },
] as const

export function FeaturesGridSection() {
  return (
    <section
      id="features"
      className="landing-surface relative border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,232,143,0.03),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl mb-16">
          <span className="section-kicker">Capacidades</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Habilidades desenhadas <br />
            <span className="text-emerald-400">para o operador.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-[17px]">
            Um runtime resiliente que evolui de acordo com a sua rotina, mantendo todos os blocos de dados salvos na sua própria infraestrutura local.
          </p>
        </div>

        {/* Clean 3-column typography grid of the 6 capabilities */}
        <div className="grid gap-12 sm:gap-16 md:grid-cols-2 lg:grid-cols-3">
          {abilities.map((item) => (
            <div key={item.num} className="border-t border-white/5 pt-8">
              <span className="font-mono text-xs font-bold text-emerald-400 block mb-4">
                {item.num}.
              </span>
              <h3 className="text-lg font-medium text-white tracking-tight">
                {item.name}
              </h3>
              <p className="mt-3.5 text-xs leading-relaxed text-neutral-500">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
