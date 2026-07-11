export const NAV_LINKS = [
  { id: 'overview', href: '#overview', label: 'O que é' },
  { id: 'how-it-works', href: '#how-it-works', label: 'Como funciona' },
  { id: 'connections', href: '#connections', label: 'Onde usa' },
  { id: 'install', href: '#install', label: 'Começar' },
]

export const HERO_MESSAGES = [
  { role: 'user' as const, text: 'Zavorth, organize meus arquivos de trabalho e me avise no Telegram.' },
  { role: 'zavorth' as const, text: 'Encontrei 42 arquivos que podem ser organizados.' },
  { role: 'zavorth' as const, text: 'Criei uma prévia segura. Nenhum arquivo foi alterado ainda.' },
]

export const CONNECTIONS = [
  { name: 'Dashboard', icon: 'LayoutDashboard', status: 'ready' as const },
  { name: 'Web', icon: 'Globe', status: 'ready' as const },
  { name: 'CLI', icon: 'Terminal', status: 'ready' as const },
  { name: 'Telegram', icon: 'Send', status: 'ready' as const },
  { name: 'WhatsApp', icon: 'MessageCircle', status: 'config' as const },
  { name: 'Discord', icon: 'Hash', status: 'config' as const },
  { name: 'API', icon: 'Code', status: 'ready' as const },
  { name: 'Mobile', icon: 'Smartphone', status: 'soon' as const },
]
