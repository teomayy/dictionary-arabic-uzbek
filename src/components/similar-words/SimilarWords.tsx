import { Bookmark } from 'lucide-react'
import Link from 'next/link'

export default function SimilarWords() {
	return (
		<div className='mt-8'>
			<h1>O'xshash so'zlar</h1>
			<div className='w-full h-screen'>
				<ul className='divide-y'>
					<li className='flex items-center p-4 border-b dark:border-none hover:bg-white dark:hover:bg-slate-400'>
						<Link
							className='w-full cursor-pointer flex justify-between'
							href=''
						>
							<span>الصبر</span>
							<Bookmark className='hover:text-[#149E53]' />
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
