// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'





// Local imports
import { Select } from 'components/Forms/Select'
import { useStore } from 'hooks/useStore'





export function PokemonSelect(props) {
	const { isRequired } = props

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
			isRequired={isRequired}
			label="Select a Pokemon..."
			options={options} />
	)
}

PokemonSelect.defaultProps = {
	isRequired: false,
}

PokemonSelect.propTypes = {
	isRequired: PropTypes.bool,
}
