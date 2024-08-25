import { LibraryBig } from 'lucide-react'

interface IErrorProps {
	message: string
}

export default function ErrorPage({ message }: IErrorProps) {
	return (
		<div className='flex flex-col items-center justify-center h-screen bg-white dark:bg-primary'>
			<div className='bg-[#EAEEF2] dark:bg-[#333741]  p-16 rounded-full m-4'>
				<LibraryBig className='w-32 h-32 text-[#424A53] dark:text-[#CECFD2]' />
			</div>
			<p className='text-center text-2xl dark:text-[#F5F5F6]'>{message}</p>
		</div>
	)
}
