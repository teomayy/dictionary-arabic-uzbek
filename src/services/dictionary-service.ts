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
	const words = input.trim().split(' ')
	return words[0] || ''
}

export function getRecommendations(
	input: string,
	dictionary: TDictionary,
	n: number
): IWord[] {
	const lowerInput = input.toLowerCase()

	const exactMatches = dictionary.filter(
		entry =>
			(entry.word && entry.word.toLowerCase() === lowerInput) ||
			(entry.letters && entry.letters.toLowerCase() === lowerInput) ||
			(entry.short_words &&
				entry.short_words.toLowerCase().includes(lowerInput)) ||
			(entry.short_words &&
				getFirstWord(entry.short_words).toLowerCase() === lowerInput)
	)

	const closeMatches = dictionary
		.filter(
			entry =>
				!(entry.word && entry.word.toLowerCase() === lowerInput) &&
				!(entry.letters && entry.letters.toLowerCase() === lowerInput) &&
				!(
					entry.short_words &&
					entry.short_words.toLowerCase().includes(lowerInput)
				) &&
				!(
					entry.short_words &&
					getFirstWord(entry.short_words).toLowerCase() === lowerInput
				)
		)
		.map(entry => {
			const wordDistance = getLevenshteinDistance(
				lowerInput,
				entry.word?.toLowerCase() ?? ''
			)
			const lettersDistance = getLevenshteinDistance(
				lowerInput,
				entry.letters?.toLowerCase() ?? ''
			)
			const shortWordDistance = getLevenshteinDistance(
				lowerInput,
				entry.short_words?.toLowerCase() ?? ''
			)
			const FirstWordOfShortWordDistance = getLevenshteinDistance(
				lowerInput,
				getFirstWord(entry.short_meaning)?.toLowerCase() ?? ''
			)

			const minDistance = Math.min(
				wordDistance,
				lettersDistance,
				shortWordDistance,
				FirstWordOfShortWordDistance
			)

			return { ...entry, distance: minDistance }
		})
		.sort((a, b) => a.distance - b.distance)

	const combinedResults = [...exactMatches, ...closeMatches]

	return combinedResults.slice(0, n)
}
