import React from 'react'

const productPillars = [
  ['Conversa', 'Recebe pedidos em linguagem natural pelo dashboard, terminal ou canal configurado.'],
  ['Trabalha', 'Escolhe modelos, ferramentas, skills e subtarefas conforme o objetivo.'],
  ['Acompanha', 'Mostra progresso e prepara uma previa quando uma mudanca precisa da sua confirmacao.'],
  ['Lembra', 'Mantem contexto util em memoria local revisavel, com origem e possibilidade de esquecer.'],
] as const

export function ProductIntroSection() {
  return (
    <section
      id="overview"
      data-product-intro
      className="landing-surface scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-4xl">
          <span className="section-kicker">
            O que e o Zavorth
          </span>
          <h2 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-normal text-white sm:text-6xl">
            Um sistema local para usar agentes de IA no trabalho diario.
          </h2>
          <p className="mt-7 max-w-3xl text-base leading-8 text-neutral-400 sm:text-lg">
            Voce pede um resultado. O Zavorth organiza contexto, modelos, ferramentas e canais para
            realizar o trabalho, mantendo voce informado quando uma decisao realmente importa.
          </p>
        </div>

        <div className="mt-20 border-y border-white/[0.08]">
          <div className="grid gap-8 py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <span className="text-sm text-neutral-500">Um pedido comum</span>
              <p className="mt-4 text-xl font-medium leading-8 text-white sm:text-2xl">
                "Revise este repositorio, prepare as correcoes e me avise quando estiver pronto."
              </p>
            </div>
            <div className="space-y-4 text-[15px] leading-7 text-neutral-400">
              <p>O Zavorth entende o objetivo, le o que precisa e divide o trabalho quando isso ajuda.</p>
              <p>Correcoes importantes chegam como previa antes de alterar seus arquivos.</p>
              <p>O resultado fica disponivel no historico e pode ser entregue por um canal configurado.</p>
            </div>
          </div>
        </div>

        <div className="grid border-b border-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
          {productPillars.map(([title, description], index) => (
            <div
              key={title}
              className={`py-8 sm:px-6 lg:py-10 ${
                index > 0 ? 'sm:border-l sm:border-white/[0.07]' : ''
              } ${index > 1 ? 'sm:border-t lg:border-t-0' : ''}`}
            >
              <span className="text-[11px] font-semibold text-amber-400">0{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
