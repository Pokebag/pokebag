// Module imports
import { useMemo } from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'





// Local imports
import { Field } from 'components/Forms/Field'
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
		<>
			<label className="label">{label}</label>

			<div className="field is-horizontal">
				<div className="field-body">
					<Field id="entityType">
						<Select
							id="entityType"
							label="Select a type..."
							options={entityTypesAsOptions} />
					</Field>

					<Field id="entityID">
						{!values.entityType && (
							<Select options={[]} />
						)}

						{(values.entityType === 'pokemon') && (
							<PokemonSelect />
						)}
					</Field>
				</div>
			</div>
		</>
	)
}

EntitySelect.propTypes = {
	label: PropTypes.string.isRequired,
}
