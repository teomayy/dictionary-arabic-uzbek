import { create } from 'zustand'

interface StoreState {
	searchTerm: string
	setSearchTerm: (term: string) => void
	language: 'arabic' | 'uzbek'
	setLanguage: (language: 'arabic' | 'uzbek') => void
}

export const useStore = create<StoreState>(set => ({
	searchTerm: '',
	setSearchTerm: (term: string) => set({ searchTerm: term }),
	language: 'arabic',
	setLanguage: (language: 'arabic' | 'uzbek') => set({ language }),
}))
