'use client'
import BookmarksList from '@/components/content/BookmarksList'
import { Footer } from '@/components/footer/Footer'
import { Header } from '@/components/header/Header'

export default function bookmarkPage() {
	return (
		<div className='flex bg-[#EAEEF2] md:max-w-full dark:bg-[#1F242F] mx-auto min-h-screen flex-col '>
			<Header />
			<BookmarksList />
			<Footer />
		</div>
	)
}
