import { IWord, TDictionary } from '@/models/dictionary'
import Dictionary from '../../public/dictionary.json'

export const getDictionary = () => {
	return Dictionary as TDictionary
}

function getLevenshteinDistance(a: string, b: string): number {
	const matrix: number[][] = []

	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i]
	}
	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j
	}

	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1]
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1
					) // deletion
				)
			}
		}
	}

	return matrix[b.length][a.length]
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
	for (const word of dictionary) {
		const matchesWord = word.word?.includes(input)
		const matchesLetters = word.letters?.includes(input)
		const matchesShortWords = word.short_words?.includes(input)
		const matchesFirstWord = getFirstWord(word.short_words).includes(input)
		if (
			matchesWord ||
			matchesLetters ||
			matchesShortWords ||
			matchesFirstWord
		) {
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
