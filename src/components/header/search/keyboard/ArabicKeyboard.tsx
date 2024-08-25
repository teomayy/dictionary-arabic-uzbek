import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface ArabicKeyboardProps {
	onChange: (value: string) => void
	value: string
}

export default function ArabicKeyboard({
	onChange,
	value,
}: ArabicKeyboardProps) {
	const handleKeyPress = (button: string) => {
		if (button === '{bksp}') {
			onChange(value.slice(0, -1))
		} else {
			onChange(value + button)
		}
	}

	// useEffect(() => {
	// 	onChange(value)
	// }, [value])

	return (
		<Keyboard
			layoutName='arabic'
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
