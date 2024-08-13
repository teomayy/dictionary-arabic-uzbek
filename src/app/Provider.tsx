'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import React from 'react'

type Props = {
	children: React.ReactNode
}

const queryClient = new QueryClient()
export default function Provider({ children }: Props) {
	return (
		<ThemeProvider attribute='class'>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</ThemeProvider>
	)
}
