import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Focus Group — Executive Recruiting',
  description: 'Over 30 years placing senior executives and top talent across Israel and globally.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={jakarta.variable}>
      <body>{children}</body>
    </html>
  )
}
