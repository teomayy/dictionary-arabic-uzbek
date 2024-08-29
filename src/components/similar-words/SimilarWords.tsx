'use client'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { IWord } from '@/models/dictionary'
import { useStore } from '@/store/useStore'
import { addBookmark, isBookmarked, removeBookmark } from '@/utils/isBookmarked'
import { BookmarkIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface SimilarWordsProps {
	words: IWord[]
}

const SimilarWords: React.FC<SimilarWordsProps> = ({ words }) => {
	const [bookmarkedWords, setBookmarkedWords] = useState<number[]>([])

	const { language } = useStore()
	if (!words.length) {
		return null
	}
	useEffect(() => {
		const initialBookmarks = words
			.map(word => word.id)
			.filter(id => isBookmarked(id))
		setBookmarkedWords(initialBookmarks)
	}, [words])

	const handleBookmarkClick = (id: number) => {
		if (isBookmarked(id)) {
			removeBookmark(id)
			setBookmarkedWords(prev => prev.filter(bookmarkId => bookmarkId !== id))
		} else {
			addBookmark(id)
			setBookmarkedWords(prev => [...prev, id])
		}
	}

	return (
		<div className='mt-8'>
			<h1>O'xshash so'zlar</h1>
			<div className='w-full h-screen'>
				<ul className='divide-y'>
					{words.map(word => (
						<li
							key={word.id}
							className='flex items-center p-4 border-b dark:border-none hover:bg-white dark:hover:bg-slate-400'
						>
							<Link
								className='w-full cursor-pointer flex justify-between'
								href={`${DASHBOARD_PAGES.DESCRIPTION}${encodeURIComponent(
									word.id
								)}`}
							>
								<span>
									{language === 'arabic'
										? word.word
										: getFirstWord(word.short_words)}
								</span>
							</Link>
							<button onClick={() => handleBookmarkClick(word.id)}>
								<BookmarkIcon
									className={`h-6 w-6 hover:text-[#149E53] ${
										bookmarkedWords.includes(word.id)
											? 'fill-[#149E53] text-[#149E53]'
											: ''
									}`}
								/>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

const getFirstWord = (input: string): string => {
	const words = input.trim().split(' ')
	return words[0] || ''
}
export default SimilarWords
