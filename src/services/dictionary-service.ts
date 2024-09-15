import { IWord, TDictionary } from '@/models/dictionary'
import Dictionary from '../../public/dictionary.json'

export const getDictionary = () => {
	return Dictionary as TDictionary
}

const getFirstWord = (input: string): string => {
	if (!input) return ''
	const words = input?.trim().split(' ')
	return words[0] || ''
}

export function getRecommendations(
	input: string,
	dictionary: TDictionary,
	n: number
): IWord[] {
	const res: IWord[] = []
	const lowerInput = input.toLowerCase()

	for (const word of dictionary) {
		const lowerWord = word.word?.toLowerCase()
		const lowerLetters = word.letters?.toLowerCase()
		const lowerFirstWord = getFirstWord(word.short_words)?.toLowerCase()

		const matchesWord = lowerWord?.includes(lowerInput)
		const matchesLetters = lowerLetters?.includes(lowerInput)
		const matchesFirstWord = lowerFirstWord?.includes(lowerInput)
		if (matchesWord || matchesLetters || matchesFirstWord) {
			res.push(word)
		}
		if (res.length >= n) {
			break
		}
	}
	return res
}

const cachedRecommendationsFactory = (): typeof getRecommendations => {
	const hMap = new Map()
	return function (...args: Parameters<typeof getRecommendations>) {
		const hash = args[0] + args[2]
		if (hMap.has(hash)) {
			return hMap.get(hash)
		}
		const res = getRecommendations(...args)
		hMap.set(hash, res)
		return res
	}
}
export const getCachedRecomenndations = cachedRecommendationsFactory()

export function findWordByRoot(
	inputRoot: string,
	dictionary: TDictionary,
	n: number
): IWord[] {
	const res: IWord[] = []

	const lowerInputRoot = inputRoot.toLowerCase()

	for (const word of dictionary) {
		const lowerRoot = word.root?.toLowerCase()

		if (lowerRoot === lowerInputRoot) {
			res.push(word)
		}

		if (res.length >= n) {
			break
		}
	}
	return res
}
