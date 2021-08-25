// Module imports
import { promises as fs } from 'fs'
import merge from 'lodash-es/merge.js'
import path from 'path'





// Local imports
import { getAvailablePatches } from './getAvailablePatches.js'





// Constants
const UNITE_DATA_PATH = path.resolve(process.cwd(), 'data', 'unite')





export async function getFileAtPatchVersion(file, patchVersion = 'latest') {
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

	let fileContents = await fs.readFile(path.resolve(UNITE_DATA_PATH, 'base', file), 'utf8')
	let fileJSON = JSON.parse(fileContents)

	for (let index = 0; index < patches.length; index += 1) {
		const currentPatchVersion = patches[index]
		let currentPatchVersionFileContents = null
		let currentPatchVersionFileJSON = null

		try {
			currentPatchVersionFileContents = await fs.readFile(path.resolve(UNITE_DATA_PATH, currentPatchVersion, file), 'utf8')
			currentPatchVersionFileJSON = JSON.parse(currentPatchVersionFileContents)
			fileJSON = merge(fileJSON, currentPatchVersionFileJSON)
		} catch(error) {}
	}

	return fileJSON
}
