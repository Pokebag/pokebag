// Local imports
import * as API from 'helpers/API'





export async function getPokemonPaths() {
	const {
		data: { pokemon },
	} = await API.getUnitePokemon()

	return {
		fallback: false,
		paths: Object.keys(pokemon).map(pokemonID => ({
			params: { pokemonID },
		})),
	}
}
