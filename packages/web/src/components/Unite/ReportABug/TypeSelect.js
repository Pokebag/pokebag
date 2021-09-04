// Local imports
import { Field } from 'components/Forms/Field'
import { Select } from 'components/Forms/Select'





export function TypeSelect() {
	return (
		<Field
			id="entity-type"
			label="What are you reporting a bug for?">
			<Select
				id="entity-type"
				label="Select a type..."
				options={[
					{
						label: 'Battle Item',
						value: 'battle-items',
					},
					{
						label: 'Held Item',
						value: 'held-items',
					},
					{
						label: 'Pokémon',
						value: 'pokemon',
					},
				]} />
		</Field>
	)
}
