// Module imports
import {
	useCallback,
	useEffect,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import TextareaAutosize from 'react-textarea-autosize'





// Local imports
import { useForm } from 'components/Forms/Form'





export function Input(props) {
	const {
		alignment,
		autocomplete,
		className,
		iconLeft,
		id,
		isDisabled,
		isMultiline,
		isRequired,
		maxLength,
		minLength,
		shouldDebounceBy,
		type,
	} = props
	const {
		errors: formErrors,
		updateValidity,
		updateValue,
		values,
	} = useForm()

	const validate = useCallback(debounce(async (state, initialProps) => {
		const errors = []

		if (initialProps.maxLength && (state.length > initialProps.maxLength)) {
			errors.push('Too long')
		}

		if (initialProps.minLength && (state.length < initialProps.minLength)) {
			errors.push('Too short')
		}

		if (initialProps.isRequired && !state) {
			errors.push('Field is required')
		}

		if (typeof initialProps.validate === 'function') {
			const customError = await initialProps.validate(state, values)
			if (customError) {
				errors.push(customError)
			}
		}

		updateValidity(id, errors)
	}, shouldDebounceBy), [
		updateValidity,
		values,
	])

	const handleChange = useCallback(event => {
		let value = event.target.value

		if (type === 'number') {
			// If the value contains a decimal, parse as a float. Otherwise, parse as
			// an integer.
			if (value.indexOf('.') !== -1) {
				value = parseFloat(value)
			} else {
				value = parseInt(value)
			}
		}

		updateValue(id, value)
		validate(value, props)
	}, [
		id,
		props,
		type,
		updateValue,
		validate,
	])

	useEffect(() => {
		// Mark hidden and empty, non-required fields as valid
		if (!isRequired && !values[id]) {
			updateValidity(id, [])

		// Run a validity check against a field's initial state if it's non-empty
		} else if (isRequired && (values[id] !== '')) {
			validate(values[id], props)
		}
	}, [])

	return (
		<div
			className={classnames(className, {
				control: true,
				'has-icons-left': iconLeft,
				'has-icons-right': formErrors[id]?.length,
			})}>

			{isMultiline && (
				<TextareaAutosize
					autoComplete={autocomplete}
					className={classnames({
						'has-text-centered': alignment === 'center',
						'has-text-right': alignment === 'right',
						textarea: true,
						'is-danger': formErrors[id]?.length,
					})}
					disabled={isDisabled}
					id={id}
					maxLength={maxLength}
					minLength={minLength}
					onChange={handleChange}
					required={isRequired}
					value={values[id]} />
			)}

			{!isMultiline && (
				<input
					autoComplete={autocomplete}
					className={classnames({
						'has-text-centered': alignment === 'center',
						'has-text-right': alignment === 'right',
						input: true,
						'is-danger': formErrors[id]?.length,
					})}
					disabled={isDisabled}
					id={id}
					maxLength={maxLength}
					minLength={minLength}
					onChange={handleChange}
					required={isRequired}
					type={type}
					value={values[id]} />
			)}

			{Boolean(iconLeft) && (
				<span className="icon is-small is-left">
					<FontAwesomeIcon
						fixedWidth
						icon={iconLeft} />
				</span>
			)}

			{Boolean(formErrors[id]?.length) && (
				<span className="icon is-small is-right">
					<FontAwesomeIcon
						fixedWidth
						icon="exclamation-triangle" />
				</span>
			)}
		</div>
	)
}

Input.defaultProps = {
	alignment: 'left',
	autocomplete: null,
	className: null,
	iconLeft: null,
	isDisabled: false,
	isMultiline: false,
	isRequired: false,
	maxLength: null,
	minLength: null,
	shouldDebounceBy: 0,
	type: 'text',
	validate: () => {},
}

Input.propTypes = {
	alignment: PropTypes.oneOf(['center', 'left', 'right']),
	autocomplete: PropTypes.string,
	className: PropTypes.string,
	iconLeft: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.string,
	]),
	id: PropTypes.string.isRequired,
	isDisabled: PropTypes.bool,
	isMultiline: PropTypes.bool,
	isRequired: PropTypes.bool,
	maxLength: PropTypes.number,
	minLength: PropTypes.number,
	shouldDebounceBy: PropTypes.number,
	type: PropTypes.string,
	validate: PropTypes.func,
}
