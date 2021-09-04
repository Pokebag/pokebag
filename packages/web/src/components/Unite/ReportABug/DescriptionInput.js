// Module imports
import { useMemo } from 'react'





// Local imports
import { Field } from 'components/Forms/Field'
import { Input } from 'components/Forms/Input'
import { useForm } from 'components/Forms/Form'





export function DescriptionInput() {
	const { values } = useForm()

	const isDisabled = useMemo(() => !values['entityID'], [values['entityID']])

	return (
		<Field
			id="description"
			label="Describe the bug">
			<Input
				id="description"
				isDisabled={isDisabled}
				isMultiline
				isRequired
				placeholder="e.g. When a Pokémon gets hit with with Stealth Rock, it is teleported to a completely different match and immediately wins." />
		</Field>
	)
}
