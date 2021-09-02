// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Local imports
import { Dropdown } from 'components/Dropdown'
import { SelectOption } from 'components/Forms/SelectOption'
import { useForm } from 'components/Forms/Form'





function parseOptions(option) {
	if (typeof option === 'string') {
		return {
			disabled: false,
			id: option,
			label: option,
			value: option,
		}
	}

	const parsedOption = { ...option }

	if (!parsedOption.value) {
		parsedOption.value = parsedOption.label
	}

	if (!parsedOption.id) {
		parsedOption.id = parsedOption.value
	}

	if (typeof parsedOption.disabled === 'undefined') {
		parsedOption.disabled = false
	}

	return parsedOption
}

export function Select(props) {
	const {
		className,
		id,
		isMultiselect,
	} = props
	const {
		updateValidity,
		updateValue,
		values,
	} = useForm()

	const currentValue = useMemo(() => values[id], [
		id,
		values[id]
	])

	const options = useMemo(() => {
		return props.options.map(parseOptions)
	}, [props.options])

	const label = useMemo(() => {
		if (Array.isArray(currentValue) && currentValue.length) {
			const selectedOption = options.find(option => option.value === currentValue[0])

			return (
				<span>
					{selectedOption.label}

					{(currentValue.length > 1) && (
						<span>{`+${currentValue.length - 1} more`}</span>
					)}
				</span>
			)
		}

		if (currentValue) {
			const selectedOption = options.find(option => option.value === currentValue)

			if (selectedOption?.label) {
				return selectedOption.label
			}
		}

		return props.label
	}, [
		currentValue,
		options,
		props.label,
	])

	const validate = useCallback(async (state, initialProps) => {
		const errors = []

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
	}, [
		id,
		updateValidity,
		values[id],
	])

	const handleSelect = useCallback(optionValue => () => {
		let newValue = optionValue

		if (isMultiselect) {
			if (currentValue.includes(optionValue)) {
				newValue = currentValue.filter(item => item !== optionValue)
			} else {
				newValue = [
					...currentValue,
					optionValue,
				]
			}
		}

		updateValue(id, newValue)
		validate(newValue, props)
	}, [
		currentValue,
		id,
		isMultiselect,
		props,
		updateValue,
		validate,
	])

	const mapOptions = useCallback(option => {
		let isSelected = currentValue === option.value

		if (isMultiselect) {
			isSelected = currentValue.includes(option.value)
		}

		return (
			<SelectOption
				isSelected={isSelected}
				key={option.id}
				onClick={handleSelect(option.value)}
				showCircle={isMultiselect}>
				{option.label}
			</SelectOption>
		)
	}, [
		currentValue,
		isMultiselect,
	])

	return (
		<Dropdown
			className={className}
			isMultiselect={isMultiselect}
			label={label}>
			{options.map(mapOptions)}
		</Dropdown>
	)
}

Select.defaultProps = {
	className: '',
	isMultiselect: false,
}

Select.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	isMultiselect: PropTypes.bool,
	label: PropTypes.string.isRequired,
	options: PropTypes.arrayOf(PropTypes.oneOfType([
		PropTypes.shape({
			disabled: PropTypes.bool,
			id: PropTypes.string,
			label: PropTypes.string.isRequired,
			value: PropTypes.any,
		}),
		PropTypes.string,
	])).isRequired,
}
