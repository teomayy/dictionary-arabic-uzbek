import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import {
	getDictionary,
	getRecommendations,
} from '@/services/dictionary-service'
import { useStore } from '@/store/useStore'
import { BookmarkIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo } from 'react'

export const ContentBody: React.FC = () => {
	const { searchTerm } = useStore()
	const wordList = getDictionary()

	const recommendations = useMemo(() => {
		return getRecommendations(searchTerm, wordList, 10)
	}, [wordList, searchTerm])

	return (
		<div className='w-full h-screen dark:bg-[#1F242F]'>
			<ul className='divide-y'>
				{recommendations.map(word => (
					<li
						key={word.id}
						className='flex justify-between items-center p-4 border-b dark:border-none hover:bg-slate-400'
					>
						<Link
							className='w-full cursor-pointer flex justify-between'
							href={`${DASHBOARD_PAGES.DESCRIPTION}${encodeURIComponent(
								word.id
							)}`}
						>
							<span className='text-lg'>{word.word}</span>
							<BookmarkIcon className='h-6 w-6 ' />
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
