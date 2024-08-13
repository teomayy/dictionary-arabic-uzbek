'use client'

import ContentBox from '@/components/content/ContentBox'
import { Header } from '@/components/header/Header'
import SearchBox from '@/components/search/SearchBox'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'
import dictionaryData from '../../../public/dictionary.json' assert { type: 'json' }

interface DictionaryEntry {
	id: number
	letters: string
	long_words: string
	meaning: string
	other: string
	plural_letters: string
	root: string
	short_meaning: string
	short_words: string
	word: string
}

const dictionary: DictionaryEntry[] = dictionaryData as DictionaryEntry[]

const getFirstWord = (input: string): string => {
	const words = input.trim().split(' ')
	return words[0] || ''
}

export default function DashboardPage() {
	const [searchResult, setSearchResult] = useState<DictionaryEntry | null>(null)

	const handleSearch = (searchTerm: string) => {
		if (searchTerm.trim() === '') {
			setSearchResult(null)
			return
		}
		const lowerCaseSearchTerm = searchTerm.toLowerCase()
		const result = dictionary.find(
			(entry: DictionaryEntry) =>
				entry.word === lowerCaseSearchTerm ||
				entry.letters === lowerCaseSearchTerm ||
				getFirstWord(entry.short_meaning) === lowerCaseSearchTerm
		)
		if (result) {
			setSearchResult(result)
		} else {
			setSearchResult(null)
			toast.error(`"${searchTerm}" so'zi topilmadi`)
		}
	}
	return (
		<div className='max-w-[689px] flex flex-col gap-10 mx-auto pt-10 px-5'>
			<Header />
			<SearchBox onSearch={handleSearch} />
			{searchResult ? (
				<ContentBox
					word={searchResult.word}
					transcription={searchResult.other}
					partOfSpeech={searchResult.short_meaning}
					meaning={searchResult.meaning}
				/>
			) : (
				!searchResult && <p>Izlash uchun so&apos;zni kiriting</p>
			)}
			<Toaster richColors closeButton theme='system' />
		</div>
	)
}
