import React, {
	useRef,
	useState,
	KeyboardEvent,
	BaseSyntheticEvent,
	useMemo,
	useEffect,
} from 'react'
import { style } from '../constants/style'
import { Card } from 'antd'

export const OTPComponents = () => {
	return (
		<Card bodyStyle={{ ...style, display: 'grid', placeItems: 'center' }}>
			<OTPInput />
		</Card>
	)
}

type OTPInput = string | number

interface OTPInputProps {
	value?: string
	onPaste?: (e: React.ClipboardEvent, index: number) => void
	onChange?: (e: string | null, index: number) => void
	onSubmit?: (value: string) => void
	OTPLength?: number
	label?: string | React.ReactNode
	enableMaskedValue?: boolean
}

const OTPInput = ({ OTPLength = 6, ...props }: OTPInputProps) => {
	const defaultValueArray = useMemo(
		() => Array(OTPLength).fill(''),
		[OTPLength]
	)

	const [arrayValue, setArrayValue] = useState<OTPInput[]>(defaultValueArray)
	const [maskedValue, setMaskedValue] = useState<OTPInput[]>(defaultValueArray)
	const [showTooltip, setShowTooltip] = useState(false)
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])
	const displayValue = props.enableMaskedValue ? maskedValue : arrayValue

	useEffect(() => {
		inputRefs.current[0]?.focus()
	}, [])

	const onPaste = (e: React.ClipboardEvent, index: number) => {
		e.preventDefault()
		props.onPaste?.(e, index)
		const paste = e.clipboardData.getData('text').split('')

		if (paste.every((item) => !isNaN(Number(item)))) {
			const newInputValue = [...arrayValue]
			const newMaskedValue = [...maskedValue]

			for (let i = 0; i < paste.length; i++) {
				if (index + i < arrayValue.length) {
					newInputValue[index + i] = paste[i]
					newMaskedValue[index + i] = '*'
				}
			}

			setArrayValue(newInputValue)
			setMaskedValue(newMaskedValue)
		}
	}

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		const keyCode = parseInt(e.key)
		if (
			e.key !== 'Backspace' &&
			e.key !== 'Delete' &&
			e.key !== 'Tab' &&
			!(e.metaKey && e.key === 'v') &&
			!(keyCode >= 0 && keyCode <= 9)
		) {
			e.preventDefault()
			setShowTooltip(true)
			setTimeout(() => setShowTooltip(false), 2000)
		}
	}

	const onChange = (e: BaseSyntheticEvent, index: number) => {
		props.onChange?.(e.target.value, index)
		const input = e.target.value

		if (!isNaN(input)) {
			setArrayValue((preValue: (string | number)[]) => {
				const newArray = [...preValue]
				newArray[index] = input
				return newArray
			})

			setMaskedValue((prevValue: (string | number)[]) => {
				const newArray = [...prevValue]
				newArray[index] = '*'
				return newArray
			})

			if (input !== '' && index < arrayValue.length - 1) {
				inputRefs.current[index + 1]?.focus()
			}
		}
	}

	const onKeyUp = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
		if (e.key === 'Backspace' || e.key === 'Delete') {
			setArrayValue((prevValue: (string | number)[]) => {
				const newArray = [...prevValue]
				newArray[index] = ''
				return newArray
			})

			setMaskedValue((prevValue: (string | number)[]) => {
				const newArray = [...prevValue]
				newArray[index] = ''
				return newArray
			})

			if (index > 0) {
				inputRefs.current[index - 1]?.focus()
			}
		}
	}
	const resetInputs = () => {
		setArrayValue(defaultValueArray)
		setMaskedValue(defaultValueArray)
		inputRefs.current[0]?.focus()
	}

	const handleSubmit = () => {
		console.log(arrayValue.join(''))
		// TODO: Add your Database logic here
		props.onSubmit?.(arrayValue.join(''))
	}

	return (
		<div>
			<label htmlFor='passcode'>{props.label}</label>
			<div>
				{displayValue.map((value: string | number, index: number) => (
					<input
						key={`index-${index}`}
						ref={(el) => el && (inputRefs.current[index] = el)}
						inputMode='numeric'
						maxLength={1}
						name='passcode'
						type='text'
						value={props.value ? value : String(value)}
						onChange={(e) =>
							props.value
								? props.onChange?.(e.target.value, index)
								: onChange(e, index)
						}
						onKeyUp={(e) => onKeyUp(e, index)}
						onKeyDown={(e) => onKeyDown(e)}
						onPaste={(e) => onPaste(e, index)}
						autoComplete='one-time-code'
						accessKey={String(index)}
						style={{ width: '20px', height: '40px' }}
					/>
				))}
			</div>
			{showTooltip ? (
				<div>
					<div>Only numbers are allowed.</div>
				</div>
			) : (
				<div>
					<button onClick={resetInputs}>Reset</button>
					<button onClick={handleSubmit}>Enter</button>
				</div>
			)}
		</div>
	)
}
