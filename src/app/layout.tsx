import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '../components/NavBar';
import Loader from '../app/loading';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Unizen Balance Checker',
  description: 'Unizen Balance Checker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
    <body className={`${inter.className} container mx-auto p-4 text-center font-space min-h-screen flex justify-start items-center flex-col`}>
      <NavBar />
      <Suspense fallback={<Loader />} />
      {children}
    </body>
  </html>
  )
}
