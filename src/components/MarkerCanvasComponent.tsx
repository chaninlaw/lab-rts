import { Button, Card, Modal, message } from 'antd'
import Konva from 'konva'
import {
	Stage,
	Layer,
	Image as KonvaImage,
	Group,
	Label,
	Circle,
	Text,
} from 'react-konva'
import { useImage } from '../hooks/use-image'
import { useImageProportion } from '../hooks/use-image-proportion'
import { useRef, useState } from 'react'
import jsPDF from 'jspdf'

interface Marker {
	id: number
	x: number
	y: number
	draggable?: boolean
	onClick?: (e: Konva.KonvaEventObject<MouseEvent>) => void
	onDragEnd?: (e: Konva.KonvaEventObject<DragEvent>) => void
}

const containerWidth = 1200
const containerHeight = 600

export function MarkerCanvasComponent() {
	// TODO: merge useImage and useImageProportion into one hook
	const { image, aspectRatio, status } = useImage(
		// '/AutoCAD-House-Plans-With-Dimensions-CAD-Drawing-Mon-Nov-2019-08-50-06.webp'
		'/floor-plan-3-bedroom-850x1255.jpg'
	)
	const { imageHeight, imageWidth, offsetX, offsetY } = useImageProportion({
		containerWidth,
		containerHeight,
		aspectRatio,
	})

	const stateRef = useRef<Konva.Stage>(null)
	const [markers, setMarkers] = useState<Marker[]>([])
	const [markersModal, setMarkersModal] = useState(false)
	const [exportModal, setExportModal] = useState(false)

	const calculateCoordination = (event: Konva.KonvaEventObject<MouseEvent>) => {
		const stage = event.target.getStage()
		if (!stage) return

		const scaleX = stage.scaleX()
		const x = stage.x()
		const y = stage.y()
		const pointerPosition = stage.getPointerPosition()

		if (!pointerPosition) return

		const offset = { x, y }

		const imageClickX = (pointerPosition.x - offset.x) * (1 / scaleX)
		const imageClickY = (pointerPosition.y - offset.y) * (1 / scaleX)

		return { x: imageClickX, y: imageClickY }
	}

	const handleClickImage = (event: Konva.KonvaEventObject<MouseEvent>) => {
		const coordination = calculateCoordination(event)
		if (!coordination) return

		const { x, y } = coordination

		setMarkers((prev) => [
			...prev,
			{
				id: prev.length + 1,
				x,
				y,
				draggable: true,
				onDragEnd: handleDragEndMarker,
				onClick: () => console.log('click marker'),
			},
		])
	}

	const handleDragEndMarker = (event: Konva.KonvaEventObject<DragEvent>) => {
		const coordination = calculateCoordination(event)
		if (!coordination) return

		const { x, y } = coordination

		let id = '0'
		const nodes = event.target.findAncestors('Label', true)
		if (nodes.length > 0) {
			for (let i = 0; i < nodes.length; i++) {
				id = nodes[i].getAttr('id')
			}
		} else {
			id = event.target.id()
		}

		setMarkers((prev) =>
			prev.map((marker) =>
				marker.id === parseInt(id) ? { ...marker, x, y } : marker
			)
		)
	}

	const handleZoomStage = (event: Konva.KonvaEventObject<WheelEvent>) => {
		if (!stateRef.current) return

		const scaleBy = 1.01

		event.evt.preventDefault()

		if (stateRef.current !== null) {
			const stage = stateRef.current
			const oldScale = stage.scaleX()

			const pointerPosition = stage.getPointerPosition()
			if (!pointerPosition) return

			const { x: pointerX, y: pointerY } = pointerPosition
			const mousePointTo = {
				x: (pointerX - stage.x()) / oldScale,
				y: (pointerY - stage.y()) / oldScale,
			}
			const newScale =
				event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
			stage.scale({ x: newScale, y: newScale })
			const newPos = {
				x: pointerX - mousePointTo.x * newScale,
				y: pointerY - mousePointTo.y * newScale,
			}
			stage.position(newPos)
			stage.batchDraw()
		}
	}

	if (status !== 'loaded') return null

	return (
		<>
			<Card
				title='Canvas Demo'
				classNames={{
					body: 'w-full flex flex-col items-center justify-center bg-black',
				}}
				extra={[
					<Button key='1' onClick={() => setMarkersModal(true)}>
						See markers
					</Button>,
					<Button key='2' onClick={() => setExportModal(true)}>
						Export
					</Button>,
				]}
			>
				<Stage
					ref={stateRef}
					width={containerWidth}
					height={containerHeight}
					draggable={true}
					onWheel={handleZoomStage}
					className='border border-white bg-[url("https://t4.ftcdn.net/jpg/03/20/59/61/360_F_320596186_eFYMjkK769jB7qXTXF6aP9lXNftz0VCU.jpg")] bg-cover bg-center'
				>
					<Layer>
						<Group>
							<KonvaImage
								image={image}
								width={imageWidth}
								height={imageHeight}
								x={offsetX}
								y={offsetY}
								onClick={handleClickImage}
							/>
							{markers.map(({ id, ...marker }) => (
								<Label id={String(id)} {...marker}>
									<Circle width={25} height={25} fill='#ff000099' />
									<Text
										text={String(id)}
										offsetX={3}
										offsetY={5}
										fill='#ffffff'
									/>
								</Label>
							))}
						</Group>
					</Layer>
				</Stage>
			</Card>
			<Modal
				title={`Markers`}
				open={markersModal}
				onCancel={() => setMarkersModal(false)}
			>
				<div className='flex flex-col gap-2'>
					{markers.map(({ id, ...marker }) => (
						<div key={id} className='flex'>
							<span className='h-6 w-6 rounded-full bg-[#ff000099] mr-2 text-center'>
								{id}
							</span>
							<div className='flex-1 flex gap-2'>
								<span className='text-sm'>x: {marker.x}</span>
								<span className='text-sm'>y: {marker.y}</span>
								<span className='text-sm'>
									draggable: {String(marker.draggable)}
								</span>
							</div>
						</div>
					))}
				</div>
			</Modal>
			<ExportModal
				markers={markers}
				exportModal={exportModal}
				setExportModal={setExportModal}
			/>
		</>
	)
}

function ExportModal({
	exportModal,
	setExportModal,
	markers,
}: {
	exportModal: boolean
	setExportModal: React.Dispatch<React.SetStateAction<boolean>>
	markers: Marker[]
}) {
	const stateRef = useRef<Konva.Stage>(null)
	const { image, aspectRatio, status } = useImage(
		// '/AutoCAD-House-Plans-With-Dimensions-CAD-Drawing-Mon-Nov-2019-08-50-06.webp'
		'/floor-plan-3-bedroom-850x1255.jpg'
	)

	const { imageHeight, imageWidth, offsetX, offsetY } = useImageProportion({
		containerWidth: image?.naturalWidth ?? 0,
		containerHeight: image?.naturalHeight ?? 0,
		aspectRatio,
	})

	const handleExport = async () => {
		const canvas = stateRef.current
		if (!canvas) {
			message.error('Canvas not loaded properly.')
			return
		}

		const nw = image?.naturalWidth
		const nh = image?.naturalHeight

		if (nw === undefined || nh === undefined) {
			message.error('Image dimensions are undefined.')
			return
		}

		try {
			const pdf = new jsPDF({
				orientation: nw > nh ? 'l' : 'p',
				unit: 'px',
				format: [nw, nh],
			})

			const imageData = canvas.toDataURL({
				quality: 1,
				width: nw,
				height: nh,
			})

			pdf.addImage(imageData, 'PNG', 0, 0, nw, nh)

			pdf.save('exported-document.pdf')
			message.success('Document exported successfully.')
		} catch (error) {
			console.error('Error exporting PDF:', error)
			message.error('Failed to export document.')
		}
	}

	if (status !== 'loaded') {
		return null
	}

	// const handleZoomStage = (event: Konva.KonvaEventObject<WheelEvent>) => {
	// 	if (!stateRef.current) return

	// 	const scaleBy = 1.01

	// 	event.evt.preventDefault()

	// 	if (stateRef.current !== null) {
	// 		const stage = stateRef.current
	// 		const oldScale = stage.scaleX()

	// 		const pointerPosition = stage.getPointerPosition()
	// 		if (!pointerPosition) return

	// 		const { x: pointerX, y: pointerY } = pointerPosition
	// 		const mousePointTo = {
	// 			x: (pointerX - stage.x()) / oldScale,
	// 			y: (pointerY - stage.y()) / oldScale,
	// 		}
	// 		const newScale =
	// 			event.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy
	// 		stage.scale({ x: newScale, y: newScale })
	// 		const newPos = {
	// 			x: pointerX - mousePointTo.x * newScale,
	// 			y: pointerY - mousePointTo.y * newScale,
	// 		}
	// 		stage.position(newPos)
	// 		stage.batchDraw()
	// 	}
	// }

	if (status !== 'loaded') return null

	return (
		<Modal
			title='Export'
			open={exportModal}
			onCancel={() => setExportModal(false)}
			onOk={handleExport}
			width={window.innerWidth}
			centered
		>
			<div className='w-full flex flex-col items-center justify-center'>
				<Stage ref={stateRef} width={imageWidth} height={imageHeight} draggable>
					<Layer>
						<Group>
							<KonvaImage
								image={image}
								width={imageWidth}
								height={imageHeight}
								x={offsetX}
								y={offsetY}
							/>
							{markers.map(({ id, ...marker }) => (
								<Label key={id} {...marker}>
									<Circle width={25} height={25} fill='#ff000099' />
									<Text
										text={String(id)}
										offsetX={3}
										offsetY={5}
										fill='#ffffff'
									/>
								</Label>
							))}
						</Group>
					</Layer>
				</Stage>
			</div>
		</Modal>
	)
}
