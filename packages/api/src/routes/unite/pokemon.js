// Module imports
import { getPokemon } from '@pokebag/data-sdk'





// Local imports
import { Route } from '../../structures/Route.js'





export class PokemonRoute extends Route {
	path = '/pokemon'

	handler = async context => {
		try {
			const POKEMON = await getPokemon({
				includeSkills: true,
				patch: context.params.patchVersion,
			})

			context.data = {
				pokemon: POKEMON.reduce((accumulator, mon) => {
					accumulator[mon.id] = mon
					return accumulator
				}, {}),
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	}
}
