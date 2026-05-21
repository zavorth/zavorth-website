'use client'

import React from 'react'

interface StatusChipProps {
  status: 'ready' | 'waiting' | 'blocked' | 'completed' | 'soon' | 'config' | 'approval'
  className?: string
}

const statusConfig = {
  ready:     { label: 'Pronto', className: 'status-chip--ready' },
  completed: { label: 'Concluído', className: 'status-chip--ready' },
  waiting:   { label: 'Aguardando', className: 'status-chip--waiting' },
  approval:  { label: 'Pede aprovação', className: 'status-chip--waiting' },
  config:    { label: 'Precisa configurar', className: 'status-chip--config' },
  blocked:   { label: 'Bloqueado', className: 'status-chip--blocked' },
  soon:      { label: 'Em breve', className: 'status-chip--soon' },
}

export function StatusChip({ status, className = '' }: StatusChipProps) {
  const config = statusConfig[status]
  return (
    <span className={`status-chip ${config.className} ${className}`}>
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: 'currentColor' }}
        aria-hidden="true"
      />
      {config.label}
    </span>
  )
}
