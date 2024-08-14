import { cn } from '@/utils/cn'
import { Keyboard, Search } from 'lucide-react'
import { useState } from 'react'
import ArabicKeyboard from './keyboard/ArabicKeyboard'

interface SearchBoxProps {
	onSearch: (searchTerm: string) => void
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [showKeyboard, setShowKeyboard] = useState<boolean>(false)
	const [isArabic, setIsArabic] = useState<boolean>(false)

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

	const toggleArabic = () => {
		setIsArabic(prev => !prev)
	}

	return (
		<div className='relative flex flex-col items-center'>
			<form
				onSubmit={handleSearch}
				className='relative flex items-center w-full gap-4'
			>
				<div className='flex flex-row'>
					<div className='flex items-start'>
						<button type='button' onClick={toggleKeyboard}>
							<Keyboard
								className={`w-14 h-8 transition-colors ${
									showKeyboard ? 'text-primary' : 'text-gray-400'
								}  `}
							/>
						</button>
					</div>

					<div className='flex flex-col mt-1 items-center justify-center'>
						<button
							type='button'
							onClick={toggleArabic}
							className={cn(
								'flex h5 w-10 bg-gray-500 hover:bg-[#DDFFBB] cursor-pointer items-center rounded-full p-1',
								{ 'bg-[#DDFFBB]': isArabic }
							)}
						>
							<div
								className={cn(
									'h-4 w-4 rounded-full bg-white transition-all dark:bg-very-dark-bg',
									{ 'translate-x-0': !isArabic },
									{ 'translate-x-full': isArabic }
								)}
							></div>
						</button>
						<div className='flex flex-row-reverse w-14 leading-4 text-[8px]'>
							Smart Arabic Autocomplete
						</div>
					</div>
				</div>

				<input
					type='text'
					placeholder="So'z izlash..."
					className={`bg-gray-200 placeholder:font-bold outline-primary w-full h-12 sm:h-[64px] px-4 rounded-2xl pr-12 dark:bg-slate-800 ${
						isArabic ? 'text-right' : 'text-left'
					}`}
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
