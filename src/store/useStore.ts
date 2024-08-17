import create from 'zustand'

interface StoreState {
	searchTerm: string
	setSearchTerm: (term: string) => void
}

export const useStore = create<StoreState>(set => ({
	searchTerm: '',
	setSearchTerm: (term: string) => set({ searchTerm: term }),
}))
