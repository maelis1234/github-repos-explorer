import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'GitHub Repos Explorer',
  description: 'Technical test for Sephora',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className='p-4 bg-black text-white'>
          <h1 className='text-xl font-bold'>GitHub Repos Explorer</h1>
        </header>
        <main className='flex items-center justify-center'>{children}</main>
      </body>
    </html>
  )
}
