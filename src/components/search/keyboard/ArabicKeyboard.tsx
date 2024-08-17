import { useEffect } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface ArabicKeyboardProps {
	onChange: (input: string) => void
	input: string
	setInput: (input: string) => void
}

export default function ArabicKeyboard({
	onChange,
	input,
	setInput,
}: ArabicKeyboardProps) {
	const handleKeyPress = (button: string) => {
		if (button === '{bksp}') {
			setInput(input.slice(0, -1))
		} else {
			setInput(input + button)
		}
		onChange(input + button)
	}

	useEffect(() => {
		onChange(input)
	}, [input])

	return (
		<Keyboard
			layoutName='arabic'
			onChange={onChange}
			onKeyPress={handleKeyPress}
			layout={{
				arabic: [
					'ض ص ث ق ف غ ع ه خ ح ج د {bksp}',
					'ش س ي ب ل ا ت ن م ك ط',
					'ئ ء ؤ ر لا ى ة و ز ظ',
					'ذ 1 2 3 4 5 6 7 8 9 0',
				],
			}}
			display={{
				'{bksp}': '⌫',
			}}
		/>
	)
}
