import type { Metadata } from 'next'
import { Ubuntu } from 'next/font/google'
import '@/css//globals.css'

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: 'Project Palestine',
  description: '"A way for us to boycott the occupation and it’s supporters',
  icons: ['palestine.png']
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        {children}
      </body>
    </html>
  )
}
