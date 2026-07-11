import React from 'react'
import Image from 'next/image'

export type StackItem = {
  id: string
  name: string
  title: string
  src: string
}

/**
 * Famous AI / channel marks Zavorth integrates with.
 * SVGs from Simple Icons (monochrome) — same approach pro landings use.
 */
export const STACK_ITEMS: StackItem[] = [
  { id: 'openai', name: 'OpenAI', title: 'OpenAI', src: '/logos/openai.svg' },
  { id: 'claude', name: 'Claude', title: 'Claude · Anthropic', src: '/logos/anthropic.svg' },
  { id: 'gemini', name: 'Gemini', title: 'Gemini · Google', src: '/logos/googlegemini.svg' },
  { id: 'github', name: 'GitHub', title: 'GitHub', src: '/logos/github.svg' },
  { id: 'telegram', name: 'Telegram', title: 'Telegram', src: '/logos/telegram.svg' },
  { id: 'discord', name: 'Discord', title: 'Discord', src: '/logos/discord.svg' },
]

type StackIconsRowProps = {
  className?: string
  reveal?: boolean
  visible?: boolean
  /** show name under icon */
  labeled?: boolean
}

export function StackIconsRow({
  className = '',
  reveal = false,
  visible = true,
  labeled = false,
}: StackIconsRowProps) {
  const classes = [
    'stack-icons',
    labeled ? 'stack-icons--labeled' : '',
    reveal ? 'stack-icons--reveal' : '',
    reveal && visible ? 'is-visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <ul className={classes} aria-label="Funciona com as principais ferramentas de IA">
      {STACK_ITEMS.map(({ id, name, title, src }) => (
        <li key={id} className="list-none">
          <span className="stack-icon" title={title} aria-label={title}>
            <Image
              src={src}
              alt=""
              width={20}
              height={20}
              className="stack-icon__img"
              unoptimized
            />
            {labeled ? <span className="stack-icon__label">{name}</span> : (
              <span className="sr-only">{name}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )
}
