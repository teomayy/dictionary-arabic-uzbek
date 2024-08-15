import { Book } from 'lucide-react'
import SelectFont from './fontChanger/SelectFont'
import DarkLightModeBtn from './modeChange/DarkLightModeBtn'

export function Header() {
	const handleResetClick = () => {
		window.location.href = '/i'
	}

	return (
		<header>
			<div className='w-full flex justify-between items-center'>
				<button onClick={handleResetClick}>
					<Book className='text-4xl text-gray-400 w-20 h-10' />
				</button>

				<div className='flex gap-4 items-center'>
					<SelectFont />
					<DarkLightModeBtn />
				</div>
			</div>
		</header>
	)
}
