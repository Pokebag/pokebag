// Module imports
import { useRouter } from 'next/router'
import { useEffect } from 'react'





export function useHandleMode () {
	const Router = useRouter()

	useEffect(() => {
		if (Router.query?.mode) {
			const newQueryParams = { ...Router.query }
			let targetPath = null

			delete newQueryParams.mode

			switch (Router.query?.mode) {
				case 'resetPassword':
					targetPath = '/reset-password'
					break

				default:
					console.log(Router.query)
			}

			const url = new URL(targetPath, location.origin)

			Object.entries(newQueryParams).forEach(([key, value]) => {
				url.searchParams.append(key, value)
			})

			Router.replace(url.toString().replace(location.origin, ''), targetPath)
		}
	}, [Router.query?.mode])
}
