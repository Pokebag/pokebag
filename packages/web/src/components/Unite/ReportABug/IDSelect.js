// Module imports
import { useMemo } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { Field } from 'components/Forms/Field'
import { Select } from 'components/Forms/Select'
import { useForm } from 'components/Forms/Form'





function mapItemsToOptions(item) {
	return {
		label: item.displayName,
		value: item.id,
	}
}

export function IDSelect(props) {
	const {
		heldItems,
		pokemon,
	} = props
	const { values } = useForm()

	const entityType = useMemo(() => values['entity-type'], [values['entity-type']])

	const heldItemOptions = useMemo(() => {
		return Object.values(heldItems).map(mapItemsToOptions)
	}, [heldItems])

	const pokemonOptions = useMemo(() => {
		return Object.values(pokemon).map(mapItemsToOptions)
	}, [pokemon])

	const {
		entityTypeLabel,
		options
	} = useMemo(() => {
		switch (entityType) {
			case 'battle-item':
				return {
					entityTypeLabel: 'Battle Item',
					options: [
						{
							label: 'Eject Button',
							value: 'eject-button',
						},
						{
							label: 'Fluffy Tail',
							value: 'fluffy-tail',
						},
						{
							label: 'Full Heal',
							value: 'full-heal',
						},
						{
							label: 'Goal Getter',
							value: 'goal-getter',
						},
						{
							label: 'Potion',
							value: 'potion',
						},
						{
							label: 'Slow Smoke',
							value: 'slow-smoke',
						},
						{
							label: 'X Attack',
							value: 'x-attack',
						},
						{
							label: 'X Speed',
							value: 'x-speed',
						},
					],
				}

			case 'held-item':
				return {
					entityTypeLabel: 'Held Item',
					options: heldItemOptions,
				}

			case 'pokemon':
				return {
					entityTypeLabel: 'Pokémon',
					options: pokemonOptions,
				}

			default:
				return {}
		}
	}, [
		entityType,
		heldItemOptions,
		pokemonOptions,
	])

	return (
		<Field
			className={classnames({
				'is-hidden': !entityType,
			})}
			id="entity-id"
			isDisabled={!entityType}
			label={`Which ${entityTypeLabel} is bugged?`}>
			<Select
				id="entity-id"
				label={`Select a ${entityTypeLabel}...`}
				options={options ?? []} />
		</Field>
	)
}

IDSelect.propTypes = {
	heldItems: PropTypes.object.isRequired,
	pokemon: PropTypes.object.isRequired,
}
