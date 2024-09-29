import type { Metadata } from 'next'

import './globals.css'
import Header from './header';
import Footer from "./footer";

export const metadata: Metadata = {
  title: 'Lancer',
  description: 'Your freelancing marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en"> 
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
      
    </html>
  )
}