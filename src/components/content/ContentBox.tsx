import { Play } from 'lucide-react'

interface ContentBoxProps {
	word: string
	transcription: string
	partOfSpeech: string
	meaning: string
}

export default function ContentBox({
	word,
	transcription,
	partOfSpeech,
	meaning,
}: ContentBoxProps) {
	return (
		<section className='flex flex-col gap-8'>
			<section className='flex flex-col gap-1'>
				<div className='flex justify-between w-full'>
					<h1 className='text-3xl sm:text-[64px] font-bold'>{word}</h1>
					<button className='group h-16 w-16 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center text-4xl transition-all'>
						<Play className='text-primary fill-primary group-hover:text-white group-hover:fill-white transition-all' />
					</button>
				</div>
				<p className='text-2xl text-primary'>{transcription}</p>
			</section>
			<div className='flex items-center gap-5'>
				<em className='text-3xl font-bold'>{partOfSpeech}</em>
				<div className=' h-[1px] w-full bg-gray-200 rounded-full' />
			</div>

			{/* MEANING */}
			<section className='flex flex-col gap-3'>
				<p className='text-xl'>Ma&apos;snosi</p>
				<div className='flex flex-row items-center gap-2'>
					<div className='h-1.5 w-1.5 bg-primary rounded-full' />
					<p>{meaning}</p>
				</div>
			</section>
		</section>
	)
}
