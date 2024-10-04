import ClientBackButton from '@/components/buttons/ClientBackButton'
import CopyButton from '@/components/buttons/CopyButton'
import ErrorPage from '@/components/error/ErrorPage'
import SimilarWords from '@/components/similar-words/SimilarWords'
import { IWord } from '@/models/dictionary'
import { findWordByRoot, getDictionary } from '@/services/dictionary-service'
import { Bookmark } from 'lucide-react'

interface DescriptionProps {
	params: { id: string }
}

async function getWordByID(
	id: string
): Promise<{ word: IWord | null; similarWords: IWord[] }> {
	const dictionary = getDictionary()
	const word = dictionary.find(entry => entry.id?.toString() === id) || null

	let similarWords: IWord[] = []

	if (word) {
		similarWords = findWordByRoot(word.root, dictionary, 10)
	}
	return { word, similarWords }
}

export default async function DescriptionPage({ params }: DescriptionProps) {
	const { word, similarWords } = await getWordByID(params.id)

	if (!word) {
		return <ErrorPage message="So'z topilmadi" />
	}

	return (
		<div className='md:max-w-full max-w-[689px] min-h-screen m-auto dark:bg-primary bg-[#EAEEF2]'>
			<div className='relative flex items-center p-5 dark:bg-secondary bg-white'>
				<ClientBackButton />
				<h1 className='mx-auto text-2xl'>Masabiyh</h1>
			</div>

			<div className='p-4 md:py-10 md:px-32'>
				<div className='w-full p-4 dark:bg-secondary rounded-xl bg-white'>
					<h1 className='text-2xl font-bold text-[#1CB854]'>{word.word}</h1>
					<p className='mt-4 dark:text-[#F5F5F6]'>{word.meaning}</p>
					<div className='flex justify-between mt-4'>
						<CopyButton textToCopy={word.meaning} />
						<Bookmark className='h-6 w-6  cursor-pointer dark:hover:text-slate-400' />
					</div>
				</div>
				<SimilarWords words={similarWords} />
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
