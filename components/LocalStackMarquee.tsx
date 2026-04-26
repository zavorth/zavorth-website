import React from 'react'

const entrySurfaces = [
  'Terminal',
  'Chat',
  'Browser',
  'Docs',
  'Git',
  'Voz',
  'API',
  'Automacoes',
  'Telegram',
  'Discord',
  'Slack',
  'WhatsApp',
  'Arquivos',
  'Repositorios',
]

export function LocalStackMarquee() {
  return (
    <div className="local-stack-marquee" aria-label="Superficies de entrada do Basilisk">
      <span className="local-stack-marquee__label">Superficies de entrada</span>
      <div className="local-stack-marquee__viewport" aria-hidden="true">
        <div className="local-stack-marquee__track">
          {[...entrySurfaces, ...entrySurfaces].map((surface, index) => (
            <strong key={`${surface}-${index}`}>
              <span>{surface}</span>
            </strong>
          ))}
        </div>
      </div>
    </div>
  )
}
