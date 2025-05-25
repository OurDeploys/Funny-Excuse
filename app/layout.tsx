import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Funny Excuse Generator',
  description: 'Generate funny excuses for your friends',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
