import { Book } from 'lucide-react'
import Link from 'next/link'
import SelectFont from './fontChanger/SelectFont'
import DarkLightModeBtn from './modeChange/DarkLightModeBtn'

export function Header() {
	return (
		<header>
			<div className='w-full flex justify-between items-center'>
				<Link href={'/i'}>
					{' '}
					<Book className='text-4xl text-gray-400 w-20 h-10' />
				</Link>

				<div className='flex gap-4 items-center'>
					<SelectFont />
					<DarkLightModeBtn />
				</div>
			</div>
		</header>
	)
}
