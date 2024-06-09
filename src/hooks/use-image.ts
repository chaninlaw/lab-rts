import React from 'react'

export function useImage(
	url: string,
	crossOrigin?: string,
	referrerpolicy?: string
) {
	const statusRef = React.useRef<'loading' | 'loaded' | 'failed'>('loading')
	const imageRef = React.useRef<HTMLImageElement>()
	const aspectRatioRef = React.useRef<number>(0)

	// trigger a re-render when the url changes
	const [, setStateToken] = React.useState(0)

	const oldUrl = React.useRef<string>()
	const oldCrossOrigin = React.useRef<string>()
	const oldReferrerPolicy = React.useRef<string>()
	if (
		oldUrl.current !== url ||
		oldCrossOrigin.current !== crossOrigin ||
		oldReferrerPolicy.current !== referrerpolicy
	) {
		statusRef.current = 'loading'
		imageRef.current = undefined
		oldUrl.current = url
		oldCrossOrigin.current = crossOrigin
		oldReferrerPolicy.current = referrerpolicy
	}

	React.useLayoutEffect(
		function () {
			if (!url) return
			const img = document.createElement('img')

			function onload() {
				statusRef.current = 'loaded'
				imageRef.current = img
				setStateToken(Math.random())
			}

			function onerror() {
				statusRef.current = 'failed'
				imageRef.current = undefined
				setStateToken(Math.random())
			}

			img.addEventListener('load', onload)
			img.addEventListener('error', onerror)
			crossOrigin && (img.crossOrigin = crossOrigin)
			referrerpolicy && (img.referrerPolicy = referrerpolicy)
			img.src = url

			aspectRatioRef.current = img.naturalWidth / img.naturalHeight

			return function cleanup() {
				img.removeEventListener('load', onload)
				img.removeEventListener('error', onerror)
			}
		},
		[url, crossOrigin, referrerpolicy]
	)

	return {
		image: imageRef.current,
		status: statusRef.current,
		aspectRatio: aspectRatioRef.current,
	}
}
