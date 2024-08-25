'use client'
import BookmarksList from '@/components/content/BookmarksList'
import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'

export default function bookmarkPage() {
	return (
		<div className='bg-[#EAEEF2] max-w-[689px] dark:bg-[#1F242F] mx-auto h-screen flex-col '>
			<Header />
			<BookmarksList />
			<Footer />
		</div>
	)
}
