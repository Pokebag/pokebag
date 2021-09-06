// Module imports
import { useMemo } from 'react'





// Local imports
import { Field } from 'components/Forms/Field'
import { MultiInput } from 'components/Forms/MultiInput'
import { useForm } from 'components/Forms/Form'





export function StepsToReproduceInput() {
	const { values } = useForm()

	const isDisabled = useMemo(() => !values['entityID'], [values['entityID']])

	return (
		<Field
			helperText="Please be as specific as possible."
			id="stepsToReproduce"
			label="What steps must be taken to reproduce this bug?">
			<MultiInput
				id="stepsToReproduce"
				isDisabled={isDisabled}
				isRequired
				prefix="Step" />
		</Field>
	)
}
