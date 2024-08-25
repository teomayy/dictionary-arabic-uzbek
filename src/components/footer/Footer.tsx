import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export function Footer() {
	return (
		<div className='fixed max-w-[689px] bottom-0 bg-[white] dark:bg-[#161B26] shadow-md'>
			<div className='flex w-[689px] justify-between px-6 py-2'>
				{MENU.map(item => (
					<MenuItem item={item} key={item.link} />
				))}
			</div>
		</div>
	)
}
