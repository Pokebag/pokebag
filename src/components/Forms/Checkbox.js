// Module imports
import {
	useCallback,
	useEffect,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { useForm } from 'components/Forms/Form'





export function Checkbox(props) {
	const {
		className,
		id,
		isDisabled,
		isRequired,
		label,
	} = props
	const {
		updateValidity,
		updateValue,
		values,
	} = useForm()

	const validate = useCallback(async (state, initialProps) => {
		const errors = []

		if (typeof initialProps.validate === 'function') {
			const customError = await initialProps.validate(state, values)

			if (customError) {
				errors.push(customError)
			}
		}

		updateValidity(id, errors)
	}, [
		id,
		updateValidity,
		values,
	])

	const handleChange = useCallback(event => {
		let value = event.target.checked
		updateValue(id, value)
		validate(value, props)
	}, [
		id,
		updateValue,
		validate,
	])

	useEffect(() => updateValidity(id, []), [])

	return (
		<label
			className={classnames('checkbox', className)}
			disabled={isDisabled}>
			<input
				checked={values[id]}
				className="checkbox"
				disabled={isDisabled}
				id={id}
				onChange={handleChange}
				required={isRequired}
				type="checkbox" />
			{label}
		</label>
	)
}

Checkbox.defaultProps = {
	className: null,
	isDisabled: false,
	isRequired: false,
	label: null,
	validate: () => {},
}

Checkbox.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	isRequired: PropTypes.bool,
	label: PropTypes.string,
	validate: PropTypes.func,
}
