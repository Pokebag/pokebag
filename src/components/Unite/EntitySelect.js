// Module imports
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'





// Local imports
import { BattleItemsSelect } from 'components/Unite/BattleItemsSelect'
import { Field } from 'components/Forms/Field'
import { HeldItemsSelect } from 'components/Unite/HeldItemsSelect'
import { PokemonSelect } from 'components/Unite/PokemonSelect'
import { Select } from 'components/Forms/Select'
import { useForm } from 'components/Forms/Form'
import { useStore } from 'hooks/useStore'





export function EntitySelect(props) {
	const {
		isRequired,
		label,
	} = props
	const {
		entityTypes,
	} = useStore(state => ({
		entityTypes: state.unite.entityTypes,
	}), shallow)
	const { values } = useForm()

	const entityTypesAsOptions = useMemo(() => {
		return Object.entries(entityTypes).map(([value, label]) => ({
			label,
			value,
		}))
	}, [entityTypes])

	return (
		<div className="field">
			<label className="label">{label}</label>

			<div className="columns">
				<div className="column is-half">
					<Field id="entityType">
						<Select
							id="entityType"
							isRequired={isRequired}
							label="Select a type..."
							options={entityTypesAsOptions} />
					</Field>
				</div>

				<div className="column is-half">
					<Field id="entityID">
						{!values.entityType && (
							<Select
								id="entityID"
								isDisabled
								options={[]} />
						)}

						{(values.entityType === 'battle-items') && (
							<BattleItemsSelect isRequired={isRequired} />
						)}

						{(values.entityType === 'held-items') && (
							<HeldItemsSelect isRequired={isRequired} />
						)}

						{(values.entityType === 'pokemon') && (
							<PokemonSelect isRequired={isRequired} />
						)}
					</Field>
				</div>
			</div>
		</div>
	)
}

EntitySelect.defaultProps = {
	isRequired: false,
}

EntitySelect.propTypes = {
	label: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
}
