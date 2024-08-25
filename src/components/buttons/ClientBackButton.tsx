'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ClientBackButton: React.FC = () => {
	const router = useRouter()

	return (
		<button onClick={() => router.back()}>
			<ChevronLeft />
		</button>
	)
}

export default ClientBackButton
