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
	const { label } = props
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
							<BattleItemsSelect />
						)}

						{(values.entityType === 'held-items') && (
							<HeldItemsSelect />
						)}

						{(values.entityType === 'pokemon') && (
							<PokemonSelect />
						)}
					</Field>
				</div>
			</div>
		</div>
	)
}

EntitySelect.propTypes = {
	label: PropTypes.string.isRequired,
}
