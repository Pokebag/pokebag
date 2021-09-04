// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import shallow from 'zustand/shallow'





// Local imports
import { Select } from 'components/Forms/Select'
import { useStore } from 'hooks/useStore'





export function PokemonSelect() {
	const {
		getPokemon,
		pokemon,
	} = useStore(state => ({
		getPokemon: state.unite.getPokemon,
		pokemon: state.unite.pokemon,
	}), shallow)

	const options = useMemo(() => {
		return Object.values(pokemon || {}).map(mon => ({
			label: mon.displayName,
			value: mon.id,
		}))
	}, [pokemon])

	useEffect(() => {
		if (!pokemon) getPokemon()
	}, [
		getPokemon,
		pokemon,
	])

	return (
		<Select
			id="entityID"
			isLoading={!pokemon}
			label="Select a Pokemon..."
			options={options} />
	)
}
