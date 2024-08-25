'use client'

import { cn } from '@/utils/cn'
import { useTheme } from 'next-themes'

type Props = {}

export default function DarkLightModeBtn({}: Props) {
	// const [dark, setDark] = useState(false)
	const { theme, setTheme, resolvedTheme } = useTheme()

	function toggleTheme() {
		if (resolvedTheme === 'light') setTheme('dark')
		if (resolvedTheme === 'dark') setTheme('light')
	}

	return (
		<div className='flex gap-4'>
			<button
				onClick={toggleTheme}
				className={cn(
					'flex h5 w-10 bg-gray-500 hover:bg-[#1CB854] cursor-pointer items-center rounded-full p-1',
					{ 'bg-[#1CB854]': theme == 'dark' }
				)}
			>
				<div
					className={cn(
						'h-4 w-4 rounded-full bg-white transition-all dark:bg-very-dark-bg',
						{ 'translate-x-0': theme === 'light' },
						{ 'translate-x-full': theme === 'dark' }
					)}
				></div>
			</button>
		</div>
	)
}
