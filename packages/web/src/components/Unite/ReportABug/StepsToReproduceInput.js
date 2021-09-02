// Module imports
import { useMemo } from 'react'





// Local imports
import { Field } from 'components/Forms/Field'
import { MultiInput } from 'components/Forms/MultiInput'
import { useForm } from 'components/Forms/Form'





export function StepsToReproduceInput() {
	const { values } = useForm()

	const isDisabled = useMemo(() => !values['entity-id'], [values['entity-id']])

	return (
		<Field
			helperText="Please be as specific as possible."
			id="step-1"
			label="What steps must be taken to reproduce this bug?">
			<MultiInput
				id="steps-to-reproduce"
				isDisabled={isDisabled}
				isRequired
				prefix="Step" />
		</Field>
	)
}
