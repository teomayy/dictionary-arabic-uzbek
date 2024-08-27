import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { IWord } from '@/models/dictionary'
import { getDictionary } from '@/services/dictionary-service'
import {
	BOOKMARKS_LOCALSTORAGE_KEY,
	removeBookmark,
} from '@/utils/isBookmarked'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { useStore } from '@/store/useStore'
import ErrorPage from '../error/ErrorPage'
import Loader from '../loader/Loader'

const BookmarksList: React.FC = () => {
	const [bookmarkedWords, setBookmarkedWords] = useState<number[]>([])
	const [words, setWords] = useState<IWord[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const { language } = useStore()

	useEffect(() => {
		const bookmarks = localStorage.getItem(BOOKMARKS_LOCALSTORAGE_KEY)
		if (bookmarks) {
			const bookmarksIds = JSON.parse(bookmarks) as number[]
			setBookmarkedWords(bookmarksIds)
		}
	}, [])

	useEffect(() => {
		const loadWords = async () => {
			setIsLoading(true)
			const dictionary = getDictionary()
			const filteredWords = dictionary.filter(word =>
				bookmarkedWords.includes(word.id)
			)
			setWords(filteredWords)
			setIsLoading(false)
		}
		loadWords()
	}, [bookmarkedWords])

	const handleRemoveBookmark = (id: number) => {
		removeBookmark(id)
		setBookmarkedWords(prev => prev.filter(bookmarkId => bookmarkId !== id))
	}
	return (
		<div className='w-full dark:bg-[#1F242F]'>
			{isLoading ? (
				<Loader />
			) : words.length > 0 ? (
				<ul className='divide-y'>
					{words.map(word => (
						<li
							key={word.id}
							className='flex justify-between items-center p-4 border-b dark:border-none hover:bg-white dark:hover:bg-slate-400'
						>
							<Link
								className='w-full cursor-pointer flex justify-between'
								href={`${DASHBOARD_PAGES.DESCRIPTION}${encodeURIComponent(
									word.id
								)}`}
							>
								<span className='text-lg'>
									{language === 'arabic'
										? word.word
										: getFirstWord(word.short_words)}
								</span>
							</Link>
							<button onClick={() => handleRemoveBookmark(word.id)}>
								<Bookmark className='h-6 w-6 fill-[#149E53] text-[#149E53]' />
							</button>
						</li>
					))}
				</ul>
			) : (
				<ErrorPage message="So'z saqlanmagan" />
			)}
		</div>
	)
}

const getFirstWord = (input: string): string => {
	const words = input.trim().split(' ')
	return words[0] || ''
}

export default BookmarksList
