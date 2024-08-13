import { useState } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface ArabicKeyboardProps {
	onChange: (input: string) => void
}

export default function ArabicKeyboard({ onChange }: ArabicKeyboardProps) {
	const [layout] = useState('arabic')

	return (
		<Keyboard
			layoutName={layout}
			onChange={onChange}
			layout={{
				arabic: [
					'ض ص ث ق ف غ ع ه خ ح ج د',
					'ش س ي ب ل ا ت ن م ك ط',
					'ئ ء ؤ ر لا ى ة و ز ظ',
					'ذ 1 2 3 4 5 6 7 8 9 0',
				],
			}}
		/>
	)
}
