import type { Metadata } from 'next'
import { Livvic } from 'next/font/google'
import '@/css/globals.css'

const livvic = Livvic({ subsets: ["latin"], weight: ["300", "700"] });

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
      <body className={livvic.className}>
        <main className='main'>{children}</main>
      </body>
    </html>
  )
}
