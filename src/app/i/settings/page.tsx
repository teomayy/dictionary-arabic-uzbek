'use client'
import { Footer } from '@/components/footer/Footer'
import DarkLightModeBtn from '@/components/themeChanger/DarkLightModeBtn'
import { cn } from '@/utils/cn'
import { CircleAlert, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
	const { theme } = useTheme()
	return (
		<div className='flex flex-col  bg-[#EAEEF2] dark:bg-primary min-h-screen pt-2 max-w-[689px] mx-auto'>
			<div className='flex flex-col h-screen'>
				<div
					className={cn('flex justify-between m-4 p-4  bg-white rounded-xl', {
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
				<div
					className={cn('flex justify-between  m-4 p-4 rounded-xl bg-white', {
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
