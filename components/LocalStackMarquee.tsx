import React from 'react'

const entrySurfaces = [
  'Terminal',
  'Chat',
  'Browser',
  'Dashboard',
  'Git',
  'Voz',
  'API',
  'Automações',
  'Telegram',
  'Discord',
  'Slack',
  'WhatsApp',
  'Arquivos',
  'Repositórios',
]

export function LocalStackMarquee() {
  return (
    <div className="local-stack-marquee" aria-label="Superfícies de entrada do Zavorth">
      <span className="local-stack-marquee__label">Superfícies de entrada</span>
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
