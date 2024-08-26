import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import {
	getDictionary,
	getRecommendations,
} from '@/services/dictionary-service'
import { useStore } from '@/store/useStore'
import { addBookmark, isBookmarked, removeBookmark } from '@/utils/isBookmarked'
import { BookmarkIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export const ContentBody: React.FC = () => {
	const { searchTerm } = useStore()
	const wordList = getDictionary()

	const recommendations = useMemo(() => {
		return getRecommendations(searchTerm, wordList, 13)
	}, [wordList, searchTerm])

	const [bookmarkedWords, setBookmarkedWords] = useState<number[]>(() =>
		recommendations.filter(word => isBookmarked(word.id)).map(word => word.id)
	)

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
		<div className='w-full h-screen dark:bg-[#1F242F]'>
			<ul className='divide-y p-2'>
				{recommendations.map(word => (
					<li
						key={word.id}
						className='flex justify-between items-center border-b dark:border-none  hover:bg-white dark:hover:bg-slate-400'
					>
						<Link
							className='w-full m-4 h-full cursor-pointer flex justify-between'
							href={`${DASHBOARD_PAGES.DESCRIPTION}${encodeURIComponent(
								word.id
							)}`}
						>
							<span className='text-lg'>{word.word}</span>
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
	)
}
