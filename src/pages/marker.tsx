import React from 'react'
import { Button, Card, Flex } from 'antd'
import { toPng } from 'html-to-image'
import jsPDF from 'jspdf'

export function MarkerPage() {
	const [markers, setMarkers] = React.useState<Marker[]>([])
	const containerRef = React.useRef<HTMLDivElement>(null)

	const handleClick = async () => {
		if (!containerRef.current) {
			return
		}

		try {
			const dataUrl = await toPng(containerRef.current)
			const pdf = new jsPDF()

			// Get the dimensions of the PNG image
			const img = new Image()
			img.src = dataUrl
			img.onload = () => {
				const imgWidth = img.width
				const imgHeight = img.height

				// Calculate dimensions to fit the image within the PDF
				const pdfWidth = pdf.internal.pageSize.getWidth()
				const pdfHeight = pdf.internal.pageSize.getHeight()
				const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)

				const width = imgWidth * ratio
				const height = imgHeight * ratio

				// Add the image to the PDF
				pdf.addImage(dataUrl, 'PNG', 0, 0, width, height)
				pdf.save('document.pdf')
			}
		} catch (error) {
			console.log('error', error)
		}
	}
	return (
		<Card>
			<h1>PDF to Image Converter</h1>
			<Button onClick={handleClick}>Click Me</Button>
			<Flex id='image-container' vertical gap={20}>
				<ImageMarker
					src={
						'src/assets/AutoCAD-House-Plans-With-Dimensions-CAD-Drawing-Mon-Nov-2019-08-50-06.webp'
					}
					containerRef={containerRef}
					markers={markers}
					onAddMarker={(marker: Marker) => setMarkers([...markers, marker])}
				/>
			</Flex>
		</Card>
	)
}

interface Marker {
	top: number
	left: number
}

interface MarkerProps {
	src?: string
	markers?: Marker[]
	bufferTop?: number
	bufferLeft?: number
	onAddMarker?: (marker: Marker) => void
	containerRef?: React.RefObject<HTMLDivElement>
}

const DEFUALT_BUFFER = 12
export function ImageMarker({
	src,
	markers,
	onAddMarker,
	bufferLeft = DEFUALT_BUFFER,
	bufferTop = DEFUALT_BUFFER,
	containerRef,
}: MarkerProps) {
	const imageRef = React.useRef<HTMLImageElement>(null)

	React.useEffect(() => {
		if (imageRef.current) {
			imageRef.current.draggable = false
		}
	}, [])

	const handleImageClick = (event: React.MouseEvent) => {
		if (!imageRef.current || !onAddMarker) {
			return
		}
		const rect = imageRef.current.getBoundingClientRect()
		const x = event.clientX - rect.left // x position within the element.
		const y = event.clientY - rect.top // y position within the element.

		// Adjust marker position based on the current scale and translation
		const top = ((y - bufferTop) / rect.height) * 100
		const left = ((x - bufferLeft) / rect.width) * 100
		onAddMarker({ top, left })
	}

	const getItemPosition = (marker: Marker) => {
		return {
			top: `${marker.top}%`,
			left: `${marker.left}%`,
		}
	}

	return (
		<div ref={containerRef} className='relative mx-auto'>
			<img
				ref={imageRef}
				src={src}
				onClick={handleImageClick}
				className={'mx-auto w-full'}
			/>
			{markers?.map((marker, itemNumber) => (
				<div
					key={itemNumber}
					className={
						`absolute ` +
						'w-6 h-6 text-white text-center bg-red-400 rounded-full'
					}
					style={getItemPosition(marker)}
				>
					{itemNumber + 1}
				</div>
			))}
		</div>
	)
}

export type ImagePosition = {
	top: number
	left: number
	width: number
	height: number
}
export type MousePosition = {
	clientX: number
	pageY: number
}
