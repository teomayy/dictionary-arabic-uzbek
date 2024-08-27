'use client'

import { IWord } from '@/models/dictionary'
import { useStore } from '@/store/useStore'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'

interface SimilarWordsProps {
	words: IWord[]
}

const SimilarWords: React.FC<SimilarWordsProps> = ({ words }) => {
	const { language } = useStore()
	if (!words.length) {
		return null
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
								href=''
							>
								<span>
									{language === 'arabic'
										? word.word
										: getFirstWord(word.short_words)}
								</span>
								<Bookmark className='hover:text-[#149E53]' />
							</Link>
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
