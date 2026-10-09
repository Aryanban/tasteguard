import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TasteGuard — Cultural Friction Engine for Brand Partnerships',
  description: 'Multi-agent decision system computing Cultural Friction Vectors and Qloo-validated mitigations for brand-artist partnerships.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#070A12] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  )
}
