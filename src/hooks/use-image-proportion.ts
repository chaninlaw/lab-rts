import { useMemo } from 'react'

export function useImageProportion({
	containerWidth,
	containerHeight,
	aspectRatio,
}: {
	containerWidth: number
	containerHeight: number
	aspectRatio: number
}) {
	return useMemo(() => {
		let imageWidth, imageHeight
		if (aspectRatio >= containerWidth / containerHeight) {
			imageWidth = containerWidth
			imageHeight = containerWidth / aspectRatio
		} else {
			imageHeight = containerHeight
			imageWidth = containerHeight * aspectRatio
		}

		const offsetX = (containerWidth - imageWidth) / 2
		const offsetY = (containerHeight - imageHeight) / 2

		return {
			imageWidth,
			imageHeight,
			offsetX,
			offsetY,
		}
	}, [containerWidth, containerHeight, aspectRatio])
}
