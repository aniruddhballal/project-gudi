import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Penu content backoffice for the Vasavi Penugonda Temple Trust website.',
  title: 'Penu CMS · Vasavi Penugonda Temple Trust',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
