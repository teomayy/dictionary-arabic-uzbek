'use client'

import { useLoadingStore } from '@/store/useLoadingStore'
import React from 'react'
import './Loader.css'
const Loader: React.FC = () => {
	const isLoading = useLoadingStore(state => state.isLoading)

	if (!isLoading) return null

	return (
		<div className='flex w-full p-7 justify-center items-center'>
			<div className='loader'></div>
		</div>
	)
}

export default Loader
