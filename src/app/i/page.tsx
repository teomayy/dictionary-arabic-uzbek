'use client'
import { ContentBody } from '@/components/contentBody/ContentBody'
import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'
import Loader from '@/components/loader/Loader'
import { cn } from '@/utils/cn'
import { useTheme } from 'next-themes'

export default function DashboardPage() {
	const { theme } = useTheme()

	return (
		<div
			className={cn(
				`md:max-w-full max-w-[689px] flex bg-[#EAEEF2] flex-col  mx-auto dark:bg-[#161B26]`
			)}
		>
			<Header />
			<Loader />
			<ContentBody />
			<Footer />
		</div>
	)
}
