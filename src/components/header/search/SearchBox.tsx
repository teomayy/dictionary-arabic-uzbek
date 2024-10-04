import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { useStore } from '@/store/useStore'
import { Keyboard, Search } from 'lucide-react'
import Link from 'next/link'
import { ChangeEventHandler, useCallback, useState } from 'react'
import ArabicKeyboard from './keyboard/ArabicKeyboard'

export default function SearchBox() {
	const { searchTerm, setSearchTerm } = useStore()
	const [showKeyboard, setShowKeyboard] = useState<boolean>(false)

	const allowedCharacters = /^[a-zA-Z\u0600-\u06FF\s]*$/

	const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
		input => {
			const { value } = input.target
			if (allowedCharacters.test(value)) {
				setSearchTerm(value)
			}
		},
		[setSearchTerm]
	)

	const toggleKeyboard = () => {
		setShowKeyboard(prev => !prev)
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setShowKeyboard(false)
		// Add any additional submit logic here if needed
	}

	return (
		<div className='relative flex flex-row items-center'>
			<div className='flex items-start'>
				<button type='button' onClick={toggleKeyboard}>
					<Keyboard
						className={`w-14 h-8 transition-colors ${
							showKeyboard ? 'text-primary' : 'text-gray-400'
						}  `}
					/>
				</button>
			</div>
			<form
				className='relative flex items-center w-full gap-4'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					placeholder='Qidirish...'
					className={`bg-gray-200 placeholder:font-bold outline-primary w-full h-12 sm:h-[64px] px-4 rounded-2xl pl-10 dark:bg-[#333741]
					}`}
					value={searchTerm}
					onChange={handleInputChange}
				/>
				<button type='submit' className='absolute left-3 '>
					<Search className='w-4 h-4' />
				</button>
			</form>
			{showKeyboard && (
				<div className='absolute z-30 bottom-[-200px] w-full dark:text-black'>
					<ArabicKeyboard onChange={setSearchTerm} value={searchTerm} />
				</div>
			)}
			<Link className='ml-4 hidden md:block' href={DASHBOARD_PAGES.BOOKMARK}>
				saqlanganlar
			</Link>
		</div>
	)
}
