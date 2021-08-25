// Local imports
import { getDirectoryAtPatchVersion } from '../../../helpers/unite/getDirectoryAtPatchVersion.js'
import { getFileAtPatchVersion } from '../../../helpers/unite/getFileAtPatchVersion.js'
import { Route } from '../../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const { pokemonID } = context.params

			const POKEMON = await getFileAtPatchVersion(`pokemon/${pokemonID}.json`, context.params.patchVersion)
			const SKILLS_FILES = await getDirectoryAtPatchVersion('skills', context.params.patchVersion)
			const FILTERED_SKILLS_FILES = SKILLS_FILES.filter(skillFilename => skillFilename.startsWith(pokemonID))

			const SKILLS = await Promise.all(FILTERED_SKILLS_FILES.map(async filename => {
				return getFileAtPatchVersion(`skills/${filename}`, context.params.patchVersion)
			}))

			POKEMON.id = pokemonID
			POKEMON.skills = SKILLS

			context.data = {
				pokemon: {
					[pokemonID]: POKEMON,
				},
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	},
	route: '/unite/:patchVersion/pokemon/:pokemonID',
})
