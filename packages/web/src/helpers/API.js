// Local imports
import { sortVersions } from 'helpers/sortVersions'





/******************************************************************************\
 * Core functions
\******************************************************************************/

function apiFetch(url, options = {}) {
	const compiledURL = new URL(url, process.env.NEXT_PUBLIC_API_URL)
	return fetch(compiledURL.toString(), options)
}

function apiFetchJSON(...args) {
	return apiFetch(...args)
		.then(response => response.json())
}





/******************************************************************************\
 * Helpers
\******************************************************************************/

export function getGameData(gameID) {
	return apiFetchJSON(gameID)
}

export async function getUniteHeldItems(patchVersion) {
	if (!patchVersion) {
		const {
			data: { availablePatches },
		} = await getGameData('unite')

		availablePatches.sort(sortVersions)

		patchVersion = availablePatches[availablePatches.length - 1]
	}

	return apiFetchJSON(`/unite/${patchVersion}/held-items`)
}
