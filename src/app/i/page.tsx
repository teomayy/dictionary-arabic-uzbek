'use client'
import { ContentBody } from '@/components/contentBody/ContentBody'
import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import { useStore } from '@/store/useStore'
import { cn } from '@/utils/cn'
import { useTheme } from 'next-themes'

export default function DashboardPage() {
	const { searchTerm } = useStore()
	const { theme } = useTheme()

	return (
		<div
			className={cn(`max-w-[689px] flex bg-[#EAEEF2] flex-col  mx-auto`, {
				'bg-[#161B26]': theme === 'dark',
			})}
		>
			<Header />
			<ContentBody />
			<Footer />
		</div>
	)
}
