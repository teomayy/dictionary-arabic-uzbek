import { Keyboard, Search } from 'lucide-react'
import { useState } from 'react'
import ArabicKeyboard from './keyboard/ArabicKeyboard'

interface SearchBoxProps {
	onSearch: (searchTerm: string) => void
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [showKeyboard, setShowKeyboard] = useState<boolean>(false)

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		onSearch(searchTerm)
		setShowKeyboard(false)
	}

	const handleInputChange = (input: string) => {
		setSearchTerm(input)
	}

	const toggleKeyboard = () => {
		setShowKeyboard(prev => !prev)
	}

	return (
		<div className='relative flex flex-col items-center'>
			<form
				onSubmit={handleSearch}
				className='relative flex items-center w-full'
			>
				<button type='button' onClick={toggleKeyboard}>
					<Keyboard
						className={`w-14 h-8 transition-colors ${
							showKeyboard ? 'text-primary' : 'text-gray-400'
						}  `}
					/>
				</button>
				<input
					type='text'
					placeholder="So'z izlash..."
					className='bg-gray-200 placeholder:font-bold outline-primary w-full h-[64px] px-4 rounded-2xl pr-12 dark:bg-slate-800'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<button type='submit' className='absolute right-3 text-primary'>
					<Search />
				</button>
			</form>
			{showKeyboard && (
				<div className='absolute bottom-[-200px] w-full dark:text-black'>
					<ArabicKeyboard onChange={handleInputChange} />
				</div>
			)}
		</div>
	)
}
