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

export function Header() {
	return (
		<header>
			<div className='md:hidden flex flex-col gap-5 bg-white dark:bg-[#161B26] p-2'>
				<SearchBox />
				<LanguageSwitcher />
			</div>
			<div className='hidden md:flex bg-white dark:bg-[#161B26]'>
				<img src='bg-header.png' alt='' className='w-full h-56 object-cover' />
				<span className='text-2xl absolute left-[30%] top-[20%] text-[#149E53]'>
					Masabiyh
				</span>
				<span className='text-2xl absolute left-[55%] top-[20%] text-[#149E53]'>
					Arabcha lug'at
				</span>
			</div>
		</header>
	)
}
