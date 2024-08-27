import { useStore } from '@/store/useStore'

export default function LanguageSwitcher() {
	const { language, setLanguage } = useStore()

	const toggleLanguage = () => {
		setLanguage(language === 'arabic' ? 'uzbek' : 'arabic')
	}

	return (
		<div className=' flex w-full items-center justify-center '>
			<div className='h-9 p-1 items-center relative flex w-full dark:bg-[#333741] bg-[#EAEEF2] rounded-xl z-10 '>
				<button
					className={`w-1/2 py-1 text-center rounded-xl transition-all duration-300  z-10 ${
						language === 'arabic' ? 'dark:bg-[#161B26] bg-white shadow' : ''
					}`}
					onClick={() => toggleLanguage()}
				>
					عربي
				</button>
				<button
					className={`w-1/2 p-1 text-center rounded-xl transition-all duration-300 z-10 ${
						language === 'uzbek' ? 'dark:bg-[#161B26] bg-white shadow' : ''
					}`}
					onClick={() => toggleLanguage()}
				>
					O'zbekcha
				</button>
				{/* <div
					className={`absolute top-0 bottom-0  w-1/2 dark:bg-[#161B26] bg-white rounded-xl transition-transform duration-300  ${
						isArabic ? 'transform translate-x-0' : 'transform translate-x-full'
					}`}
				/> */}
			</div>
		</div>
	)
}
