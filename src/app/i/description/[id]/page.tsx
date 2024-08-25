import ClientBackButton from '@/components/buttons/ClientBackButton'
import SimilarWords from '@/components/similar-words/SimilarWords'
import { IWord } from '@/models/dictionary'
import { getDictionary } from '@/services/dictionary-service'
import { Bookmark, Copy } from 'lucide-react'
interface DescriptionProps {
	params: { id: string }
}

async function getWordByID(id: string): Promise<IWord | null> {
	const dictionary = getDictionary()
	const word = dictionary.find(entry => entry.id && entry.id.toString() === id)
	return word || null
}

export default async function DescriptionPage({ params }: DescriptionProps) {
	const word = await getWordByID(params.id)

	if (!word) {
		//TODO NOT FOUND PAGE
		return <div>Word not found</div>
	}

	return (
		<div className='max-w-[689px] h-screen m-auto dark:bg-primary bg-[#EAEEF2]'>
			<div className='relative flex items-center p-5 dark:bg-secondary bg-white'>
				<ClientBackButton />
				<h1 className='mx-auto text-2xl'>Masabiyh</h1>
			</div>

			<div className='p-4'>
				<div className='w-full p-4 dark:bg-secondary rounded-xl bg-white'>
					<h1 className='text-2xl font-bold text-[#1CB854]'>{word.word}</h1>
					<p className='mt-4 dark:text-[#F5F5F6]'>{word.meaning}</p>
					<div className='flex justify-between mt-4'>
						<Copy className='cursor-pointer dark:hover:text-slate-400' />
						<Bookmark className='h-6 w-6 cursor-pointer dark:hover:text-slate-400' />
					</div>
				</div>
				<SimilarWords />
			</div>
		</div>
	)
}

export async function generateStaticParams() {
	const dictionary = getDictionary()

	return dictionary
		.filter(word => word.id)
		.map(word => ({
			id: word.id.toString(),
		}))
}
