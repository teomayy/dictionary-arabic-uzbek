import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IMenuItem } from './menu.interface'

export function MenuItem({ item }: { item: IMenuItem }) {
	if (typeof window === 'undefined') {
		return null
	}
	const pathname = usePathname()
	const isActive = pathname === item.link

	console.log('LINK', pathname)

	return (
		<div className={`cursor-pointer ${isActive ? 'text-[#149E53]' : ' '}`}>
			<Link
				href={item.link}
				className='flex flex-col justify-center gap-2.5 items-center py-1.5 mt-2  transition-colors hover:text-[#149E53] grounded-lg'
			>
				<item.icon />
				<span>{item.name}</span>
			</Link>
		</div>
	)
}
