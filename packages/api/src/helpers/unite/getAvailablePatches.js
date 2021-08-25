// Module imports
import fs from 'fs/promises'
import path from 'path'





// Local imports
import { sortVersions } from '../sortVersions.js'





// Constants
const UNITE_DATA_PATH = path.resolve(process.cwd(), 'data', 'unite')





export async function getAvailablePatches() {
	const patches = await fs.readdir(UNITE_DATA_PATH)
	const filteredPatches = patches.filter(item => /^(?:\d+\.)+\d+$/.test(item))
	return sortVersions(filteredPatches)
}
