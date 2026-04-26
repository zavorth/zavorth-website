import React from 'react'
import { BrandMark } from './BrandMark'

type ContentPageShellProps = {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}

export function ContentPageShell({
  eyebrow,
  title,
  intro,
  children,
}: ContentPageShellProps) {
  return (
    <main className="min-h-screen bg-surface">
      <div className="max-w-content mx-auto px-6 py-8">
        <a href="/" className="inline-flex items-center gap-2.5" aria-label="Voltar para a home do Basilisk">
          <BrandMark className="h-7 w-7" />
          <span className="text-[15px] font-semibold tracking-tight text-neutral-100">
            Basilisk
          </span>
        </a>
      </div>

      <section className="section-rhythm pt-8">
        <div className="max-w-3xl mx-auto px-6">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h1 className="mb-5 text-heading sm:text-display-sm text-neutral-50">
            {title}
          </h1>
          <p className="mb-12 max-w-2xl text-body-lg leading-relaxed text-neutral-500">
            {intro}
          </p>
          <div className="space-y-10">
            {children}
          </div>
        </div>
      </section>
    </main>
  )
}
