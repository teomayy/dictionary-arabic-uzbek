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
	const exactMatches: IWord[] = []
	const partialMatches: IWord[] = []
	const lowerInput = input.toLowerCase()

	for (const word of dictionary) {
		const lowerWord = word.word?.toLowerCase()
		const lowerLetters = word.letters?.toLowerCase()
		const lowerFirstWord = getFirstWord(word.short_words)?.toLowerCase()

		const exactMatch =
			lowerWord === lowerInput ||
			lowerLetters === lowerInput ||
			lowerFirstWord === lowerInput

		const partialMatch =
			lowerWord?.includes(lowerInput) ||
			lowerLetters?.includes(lowerInput) ||
			lowerFirstWord?.includes(lowerInput)

		if (exactMatch) {
			exactMatches.push(word)
		} else if (partialMatch) {
			partialMatches.push(word)
		}

		if (exactMatches.length + partialMatches.length >= n) {
			break
		}
	}
	return [...exactMatches, ...partialMatches].slice(0, n)
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
