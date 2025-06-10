import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChaBot ☕ - Your Report Assistant',
  description: 'Created with love by the Affan Shazer. This is a tea-themed chat experience to help you with your reports and questions.',
  keywords: ['chatbot', 'tea', 'report assistant', 'affan shazer'],
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
