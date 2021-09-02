// Module imports
import {
	getDirectory,
	getFile,
} from '@pokebag/data-sdk'





// Local imports
import { Route } from '../../structures/Route.js'





export class PokemonRoute extends Route {
	path = '/pokemon'

	handler = async context => {
		try {
			const POKEMON_FILES = await getDirectory('pokemon', context.params.patchVersion)

			const ALL_POKEMON = await Promise.all(POKEMON_FILES.map(async filename => {
				const POKEMON = await getFile(`pokemon/${filename}`, context.params.patchVersion)

				return {
					id: filename.replace(/\.json$/, ''),
					data: POKEMON,
				}
			}))

			context.data = {
				pokemon: ALL_POKEMON.reduce((accumulator, pokemon) => {
					accumulator[pokemon.id] = pokemon
					return accumulator
				}, {}),
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	}
}
