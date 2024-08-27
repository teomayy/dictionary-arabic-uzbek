import { LibraryBig } from 'lucide-react'

interface IErrorProps {
	message: string
}

export default function ErrorPage({ message }: IErrorProps) {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-primary'>
			<div className='bg-[#EAEEF2] dark:bg-[#333741]  p-10 rounded-full m-4'>
				<LibraryBig className='w-24 h-24 text-[#424A53] dark:text-[#CECFD2]' />
			</div>
			<p className='text-center text-xl dark:text-[#F5F5F6]'>{message}</p>
		</div>
	)
}
