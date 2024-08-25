import { cn } from '@/utils/cn'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import Provider from './Provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: "Arab lug'ati",
	description: 'Arbic tomonidan yozilgan programma',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<Provider>
				<body
					className={cn('dark:bg-black/95 dark:text-white', inter.className)}
				>
					{children}
					<Toaster richColors closeButton theme='system' duration={1500} />
				</body>
			</Provider>
		</html>
	)
}
