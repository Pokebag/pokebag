// Module imports
import { useMemo } from 'react'





// Local imports
import { Field } from 'components/Forms/Field'
import { Input } from 'components/Forms/Input'
import { useForm } from 'components/Forms/Form'





export function DescriptionInput() {
	const { values } = useForm()

	const entityID = useMemo(() => values['entity-id'], [
		values['entity-id']
	])

	if (!entityID) {
		return null
	}

	return (
		<Field
			id="bug-description"
			label="Describe the bug">
			<Input
				id="bug-description"
				isMultiline />
		</Field>
	)
}
