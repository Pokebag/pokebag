// Module imports
import { useEffect } from 'react'
import shallow from 'zustand/shallow'





// Local imports
import { useStore } from 'hooks/useStore'





export function useBreadcrumbs(breadcrumbs) {
	const { setBreadcrumbs } = useStore(state => ({
		setBreadcrumbs: state.setBreadcrumbs,
	}), shallow)

	useEffect(() => {
		setBreadcrumbs(breadcrumbs)
	}, [
		breadcrumbs,
		setBreadcrumbs,
	])
}
