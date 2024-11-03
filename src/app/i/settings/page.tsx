'use client'
import { Footer } from '@/components/footer/Footer'
import DarkLightModeBtn from '@/components/themeChanger/DarkLightModeBtn'
import { cn } from '@/utils/cn'
import { BOOKMARKS_LOCALSTORAGE_KEY } from '@/utils/isBookmarked'
import { CircleAlert, Moon, Rocket } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

export default function SettingsPage() {
	const { theme } = useTheme()
	const [showPopup, setShowPopup] = useState(false)

	const clearWords = () => {
		localStorage.removeItem(BOOKMARKS_LOCALSTORAGE_KEY)
		setShowPopup(true)
	}

	const closePopup = () => {
		setShowPopup(false)
	}

	return (
		<div className='flex flex-col  bg-[#EAEEF2] dark:bg-primary min-h-screen pt-2 md:max-w-full max-w-[689px] mx-auto'>
			<div className='flex flex-col h-screen gap-2'>
				<div
					className={cn('flex justify-between mx-4 p-4  bg-white rounded-xl', {
						'bg-secondary': theme === 'dark',
					})}
				>
					<div className='flex gap-2.5'>
						<Moon
							className={cn('fill-[#24292F] ', {
								'fill-[white] text-white': theme == 'dark',
							})}
						/>
						<span>Tungi rejimni yoqish</span>
					</div>

					<DarkLightModeBtn />
				</div>
				{/* Clear Archive */}
				<div
					className={cn(
						'flex justify-between items-center mx-4 p-4 bg-white rounded-xl',
						{
							'bg-secondary': theme === 'dark',
						}
					)}
				>
					<div className='flex gap-2.5 items-center'>
						<Rocket
							className={cn('fill-[#24292F]', {
								'fill-white text-white': theme === 'dark',
							})}
						/>
						<span className='text-sm'>Arxivni tozalash</span>
					</div>
					<button
						onClick={clearWords}
						className={cn(
							'text-sm px-3 py-1 bg-[#d1d5d6] rounded-md hover:bg-[b0b4b9]',
							{
								'bg-gray-700 text-white hover:bg-gray-600': theme === 'dark',
							}
						)}
					>
						Tozalash
					</button>
					{showPopup && (
						<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
							<div className='dark:bg-[#1F242F] dark:text-white px-16  py-8 rounded-lg shadow-md flex flex-col items-center space-y-2'>
								<p>Arxiv Tozalandi</p>
								<button
									onClick={closePopup}
									className='w-full bg-white text-green-500 rounded-md hover:bg-gray-100'
								>
									OK
								</button>
							</div>
						</div>
					)}
				</div>
				<div
					className={cn('flex justify-between  mx-4 p-4 rounded-xl bg-white', {
						'bg-secondary': theme === 'dark',
					})}
				>
					<div className='flex gap-2.5'>
						<CircleAlert
							className={cn('fill-black text-white border-none ', {
								'fill-white text-black': theme == 'dark',
							})}
						/>
						<span>Tungi rejimni yoqish</span>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
