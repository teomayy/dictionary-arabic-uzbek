export const BOOKMARKS_LOCALSTORAGE_KEY = 'arabic_uzbek_dictionary'

export function isBookmarked(id: number): boolean {
	if (typeof window === 'undefined') {
		return false
	}
	const bookmarks = localStorage.getItem(BOOKMARKS_LOCALSTORAGE_KEY)
	if (!bookmarks) {
		return false
	}

	try {
		const bookmarksArray = JSON.parse(bookmarks) as number[]
		return bookmarksArray.includes(id)
	} catch (error) {
		return false
	}
}

export function addBookmark(id: number): void {
	const bookmarks = localStorage.getItem(BOOKMARKS_LOCALSTORAGE_KEY)
	let bookmarksArray: number[] = []

	if (bookmarks) {
		try {
			bookmarksArray = JSON.parse(bookmarks) as number[]
		} catch (error) {
			throw error
		}
	}

	if (!bookmarksArray.includes(id)) {
		bookmarksArray.push(id)
		localStorage.setItem(
			BOOKMARKS_LOCALSTORAGE_KEY,
			JSON.stringify(bookmarksArray)
		)
	}
}

export function removeBookmark(id: number): void {
	const bookmarks = localStorage.getItem(BOOKMARKS_LOCALSTORAGE_KEY)
	if (!bookmarks) return

	try {
		let bookmarksArray = JSON.parse(bookmarks) as number[]
		bookmarksArray = bookmarksArray.filter(bookmarkId => bookmarkId !== id)
		localStorage.setItem(
			BOOKMARKS_LOCALSTORAGE_KEY,
			JSON.stringify(bookmarksArray)
		)
	} catch (error) {
		throw error
	}
}
