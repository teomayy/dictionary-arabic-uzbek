import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

// BUG: Menu o'zini tagidagi list elementlarni berkitib qo'yyabdi.
// Yoki menuni fixed qilmasdan, listni faqat bosh joyni olib qolgan qismiga scrollable bo'ladigan qilsh kerak
// Yoki listni heightini 100wh-menuHeight ga qo'yish kerak.
export function Footer() {
	return (
		<div className='sticky md:hidden max-w-full bottom-0 bg-[white] dark:bg-[#161B26] shadow-md'>
			<div className='flex justify-around max-w-full mx-auto'>
				{MENU.map(item => (
					<MenuItem item={item} key={item.link} />
				))}
			</div>
		</div>
	)
}
