import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import {
	getCachedRecomenndations,
	getDictionary,
} from '@/services/dictionary-service'
import { useStore } from '@/store/useStore'
import { addBookmark, isBookmarked, removeBookmark } from '@/utils/isBookmarked'
import { BookmarkIcon } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import SearchBox from '../header/search/SearchBox'
import LanguageSwitcher from '../header/switchers/LanguageSwitcher'

export const ContentBody: React.FC = () => {
	const { searchTerm, language } = useStore()
	const wordList = getDictionary()

	const recommendations = useMemo(() => {
		return getCachedRecomenndations(searchTerm, wordList, 200)
	}, [wordList, searchTerm])

	const [bookmarkedWords, setBookmarkedWords] = useState<number[]>([])

	useEffect(() => {
		setBookmarkedWords(
			recommendations.filter(word => isBookmarked(word.id)).map(word => word.id)
		)
	}, [recommendations])

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
		<div className='w-full min-h-screen md:p-16 dark:bg-[#1F242F]'>
			<div className='hidden md:flex gap-4 flex-col'>
				<SearchBox />
				<LanguageSwitcher />
			</div>

			<ul className='md:hidden block divide-y p-2'>
				{recommendations.map(word => (
					<li
						key={word.id}
						className='flex justify-between items-center border-b dark:border-none  hover:bg-white dark:hover:bg-slate-400'
					>
						<Link
							className='w-full p-4 h-full cursor-pointer flex justify-between'
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
						<button onClick={() => handleBookmarkClick(word.id)}>
							<BookmarkIcon
								className={`h-6 w-6  hover:text-[#149E53] ${
									bookmarkedWords.includes(word.id)
										? 'fill-[#149E53] text-[#149E53]'
										: ''
								}`}
							/>
						</button>
					</li>
				))}
			</ul>
			{searchTerm && (
				<ul className='hidden md:block divide-y p-2'>
					{recommendations.map(word => (
						<li
							key={word.id}
							className='flex justify-between items-center dark:border-none hover:bg-white dark:hover:bg-slate-400'
						>
							<Link
								className='w-full p-4 h-full cursor-pointer flex justify-between'
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
							{/* <button onClick={() => handleBookmarkClick(word.id)}>
								<BookmarkIcon
									className={`h-6 w-6 hover:text-[#149E53] ${
										bookmarkedWords.includes(word.id)
											? 'fill-[#149E53] text-[#149E53]'
											: ''
									}`}
								/>
							</button> */}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

const getFirstWord = (input: string): string => {
	const words = input.trim().split(' ')
	return words[0] || ''
}
