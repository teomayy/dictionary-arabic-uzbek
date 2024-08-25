'use client'

import { Copy } from 'lucide-react'
import { toast } from 'sonner'

interface CopyButtonProps {
	textToCopy: string
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
	const handleCopyClick = () => {
		navigator.clipboard.writeText(textToCopy)
		toast.success('Matn nusxalandi!')
	}

	return (
		<Copy
			className='cursor-pointer dark:hover:text-slate-400'
			onClick={handleCopyClick}
		/>
	)
}
