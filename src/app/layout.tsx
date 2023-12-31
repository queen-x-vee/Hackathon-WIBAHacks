import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ToastContainer, toast } from "react-toastify";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TrustBallot',
  description: 'A blockchain-based voting system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children} <div id="react-modals"></div> 
      <ToastContainer /></body>
    </html>
  )
}
