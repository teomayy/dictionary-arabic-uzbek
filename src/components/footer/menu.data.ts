import { DASHBOARD_PAGES } from '@/config/pages-url.config'
import { Bookmark, Home, Settings } from 'lucide-react'
import type { IMenuItem } from './menu.interface'

export const MENU: IMenuItem[] = [
	{
		icon: Home,
		link: DASHBOARD_PAGES.HOME,
		name: 'Asosiy',
	},
	{
		icon: Bookmark,
		link: DASHBOARD_PAGES.BOOKMARK,
		name: 'Saqlanganlar',
	},
	{
		icon: Settings,
		link: DASHBOARD_PAGES.SETTINGS,
		name: 'Sozlamalar',
	},
]
