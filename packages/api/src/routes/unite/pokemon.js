// Local imports
import { getDirectoryAtPatchVersion } from '../../helpers/unite/getDirectoryAtPatchVersion.js'
import { getFileAtPatchVersion } from '../../helpers/unite/getFileAtPatchVersion.js'
import { Route } from '../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const POKEMON_FILES = await getDirectoryAtPatchVersion('pokemon', context.params.patchVersion)

			const ALL_POKEMON = await Promise.all(POKEMON_FILES.map(async filename => {
				const POKEMON = await getFileAtPatchVersion(`pokemon/${filename}`, context.params.patchVersion)

				return {
					id: filename.replace(/\.json$/, ''),
					data: POKEMON,
				}
			}))

			context.data = {
				pokemon: ALL_POKEMON.reduce((accumulator, { id, data }) => {
					data.id = id
					accumulator[id] = data
					return accumulator
				}, {}),
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	},
	route: '/unite/:patchVersion/pokemon',
})
