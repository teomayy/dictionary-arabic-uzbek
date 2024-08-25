import dictionaryData from '../../../public/dictionary.json' assert { type: 'json' }
import SearchBox from './search/SearchBox'
import LanguageSwitcher from './switchers/LanguageSwitcher'
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

export function Header() {
	return (
		<header>
			<div className='flex flex-col gap-5 bg-white dark:bg-[#161B26] p-2'>
				<SearchBox />
				<LanguageSwitcher />
			</div>
		</header>
	)
}
