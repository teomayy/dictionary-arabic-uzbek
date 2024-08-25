export interface IWord {
	id: number
	letters: string
	long_words: string
	meaning: string
	other: string
	plural_letters: string
	root: string
	short_meaning: string
	short_words: string
	word: string
}

export type TDictionary = IWord[]
