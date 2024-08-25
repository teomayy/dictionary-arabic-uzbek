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

export function getRecommendations(
	input: string,
	dictionary: TDictionary,
	n: number
): IWord[] {
	const wordsWithDistance = dictionary.map(entry => {
		const distance = getLevenshteinDistance(input, entry.word || '')
		return { ...entry, distance }
	})

	wordsWithDistance.sort((a, b) => a.distance - b.distance)

	return wordsWithDistance.slice(0, n)
}
