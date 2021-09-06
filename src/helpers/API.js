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

export function getUniteEntityData(entityType, patchVersion) {
	let basePath = '/unite'

	if (patchVersion) {
		basePath += `/${patchVersion}`
	}

	return apiFetchJSON(`${basePath}/${entityType}`)
}

export function getUniteHeldItems(patchVersion) {
	return getUniteEntityData('held-items', patchVersion)
}

export async function getUnitePokemon(patchVersion) {
	return getUniteEntityData('pokemon', patchVersion)
}
