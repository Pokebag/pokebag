// Module imports
import { promises as fs } from 'fs'
import path from 'path'





// Local imports
import { getAvailablePatches } from '../helpers/unite/getAvailablePatches.js'
import { Route } from '../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const PATCHES = await getAvailablePatches()

			context.data = {
				availablePatches: PATCHES.filter(patchVersion => !patchVersion.startsWith('200.')),
				description: 'Join Trainers from around the world as they head for Aeos Island to compete in Unite Battles! In Unite Battles, Trainers face off in 5–on–5 team battles to see who can score the most points within the allotted time. Teamwork is key as you and your teammates defeat wild Pokémon, level up and evolve your partner Pokémon, and knock out the opposing team\'s Pokémon to prevent them from scoring points. Put your teamwork to the test, and take home the win!',
				name: 'Pokémon UNITE',
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	},
	route: '/unite',
})
