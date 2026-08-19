import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: 'Khadijat — Product Designer', description: 'Product and founding designer focused on systems, architecture, and end-to-end experiences.' }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html> }
