import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/ui/Header'
import { AuthProvider } from '@/providers/auth'
import { Footer } from '@/components/ui/Footer'
import { CartProvider } from '@/providers/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSW Store',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className='flex flex-col h-full'>
          <AuthProvider>
            <CartProvider>
              <Header />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </CartProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}
