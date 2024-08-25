export const BOOKMARKS_LOCALSTORAGE_KEY = 'arabic_uzbek_dictionary'

export default function isBookmarked(id: number) {
	const bookmarks = localStorage.getItem(BOOKMARKS_LOCALSTORAGE_KEY)
	if (!bookmarks || bookmarks.length === 0) {
		return false
	}

	let bookmarksArray = []

	try {
		bookmarksArray = JSON.parse(bookmarks) as number[]
	} catch (error) {
		return false
	}

	return bookmarksArray.includes(id)
}
