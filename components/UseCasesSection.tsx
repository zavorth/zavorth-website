import React from 'react'
import { ArrowUpRight } from 'lucide-react'

const useCases = [
  {
    title: 'Organize o trabalho diario',
    description: 'Resuma documentos, encontre informacoes, organize arquivos e acompanhe tarefas sem trocar de ferramenta a cada passo.',
    examples: 'Documentos, arquivos, lembretes e pesquisa',
  },
  {
    title: 'Crie com contexto',
    description: 'Pesquise referencias, desenvolva ideias, prepare textos e mantenha o historico do projeto disponivel entre conversas.',
    examples: 'Pesquisa, escrita, conteudo e planejamento',
  },
  {
    title: 'Construa e revise software',
    description: 'Leia repositorios, execute testes, use subtarefas especializadas e prepare mudancas para revisao antes de aplicar.',
    examples: 'Codigo, testes, revisao e terminal',
  },
  {
    title: 'Conecte rotinas e canais',
    description: 'Agende trabalhos e entregue resultados pelo dashboard, CLI, API ou canais que estejam configurados e prontos.',
    examples: 'Agendamentos, Telegram, API e automacoes',
  },
] as const

export function UseCasesSection() {
  return (
    <section id="capabilities" className="landing-surface scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <span className="section-kicker">
              O que voce pode fazer
            </span>
            <h2 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-normal text-white sm:text-5xl">
              Um agente que se adapta ao tipo de trabalho.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-neutral-500">
              A experiencia pode ser pessoal, criativa, tecnica ou voltada ao negocio. O produto muda
              a linguagem e o nivel de detalhe sem esconder o que esta fazendo.
            </p>
          </div>

          <div className="border-t border-white/[0.08]">
            {useCases.map((useCase, index) => (
              <article
                key={useCase.title}
                data-use-case-row
                className="group grid gap-5 border-b border-white/[0.08] py-8 transition-colors md:grid-cols-[56px_1fr_auto] md:items-start md:gap-7"
              >
                <span className="text-[11px] font-semibold text-neutral-600 transition-colors group-hover:text-amber-400">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-white">{useCase.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-500">{useCase.description}</p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-neutral-600">{useCase.examples}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="hidden text-neutral-700 transition-colors group-hover:text-amber-400 md:block"
                  aria-hidden="true"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
