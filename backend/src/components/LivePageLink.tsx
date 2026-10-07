import type { BeforeDocumentControlsServerProps } from 'payload'

type LivePageLinkProps = BeforeDocumentControlsServerProps & {
  livePath: string
}

export default function LivePageLink({ livePath }: LivePageLinkProps) {
  const frontendUrl = (process.env.FRONTEND_URL ?? 'http://localhost:3001').replace(/\/$/, '')

  return (
    <a
      href={`${frontendUrl}${livePath}`}
      rel="noreferrer"
      style={{
        alignItems: 'center',
        backgroundColor: '#1f1b18',
        border: '1px solid #1f1b18',
        borderRadius: '4px',
        color: '#ffffff',
        display: 'inline-flex',
        fontSize: '13px',
        fontWeight: 600,
        gap: '8px',
        marginInlineEnd: '8px',
        padding: '9px 12px',
        textDecoration: 'none',
      }}
      target="_blank"
    >
      View live page <span aria-hidden="true">↗</span>
    </a>
  )
}
