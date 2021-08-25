// Module imports
import fs from 'fs/promises'
import path from 'path'





// Local imports
import { getAvailablePatches } from './getAvailablePatches.js'





// Constants
const UNITE_DATA_PATH = path.resolve(process.cwd(), 'data', 'unite')





export async function getDirectoryAtPatchVersion(directory = '', patchVersion = 'latest') {
	const availablePatches = await getAvailablePatches()
	let patches = availablePatches

	if (patchVersion === 'latest') {
		patchVersion = availablePatches[availablePatches.length - 1]
	} else {
		const patchVersionIndex = availablePatches.indexOf(patchVersion)
		patches = availablePatches.slice(0, patchVersionIndex + 1)
	}

	if (patches.indexOf(patchVersion) === -1) {
		throw new Error(`Pokémon UNITE patch version ${patchVersion} is not available.`)
	}

	let directoryContents = await fs.readdir(path.resolve(UNITE_DATA_PATH, 'base', directory))

	for (let index = 0; index < patches.length; index += 1) {
		const currentPatchVersion = patches[index]
		let currentPatchVersionDirectoryContents = null

		try {
			currentPatchVersionDirectoryContents = await fs.readdir(path.resolve(UNITE_DATA_PATH, currentPatchVersion, directory))
			directoryContents = directoryContents.concat(currentPatchVersionDirectoryContents)
		} catch(error) {}
	}

	// dedupe directory contents
	directoryContents = Array.from(new Set(directoryContents))

	return directoryContents
}
