// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
} from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { Button } from 'components/Button'
import { Input } from 'components/Forms/Input'
import { useForm } from 'components/Forms/Form'





export function MultiInput(props) {
	const {
		id,
		inputProps,
		isDisabled,
		prefix,
		showPrefix,
	} = props
	const {
		updateValidity,
		updateValue,
		values,
	} = useForm()

	const currentValue = useMemo(() => values[id], [
		id,
		values[id],
	])

	const validate = useCallback(async (state, initialProps) => {
		const errors = []

		if (initialProps.isRequired && (!state.length || !state.some(item => item))) {
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
		updateValidity,
		values,
	])

	const handleRemoveItem = useCallback(index => () => {
		const newValue = [...currentValue]

		newValue.splice(index, 1)

		updateValue(id, newValue)
		validate(newValue, props)
	}, [
		currentValue,
		id,
		updateValue,
	])

	const handleItemChange = useCallback(index => event => {
		const newValue = [...currentValue]

		newValue[index] = event.target.value

		updateValue(id, newValue)
		validate(newValue, props)
	}, [currentValue])

	const mapItems = useCallback((_, index, array) => {
		const fieldID = `${id}::${index}`

		return (
			<li
				className="field is-expanded mb-2"
				key={index}>
				<div className="field-body">
					<div className="field has-addons">
						{showPrefix && (
							<p className="control">
								<label
									className="button is-static"
									disabled={isDisabled}
									htmlFor={fieldID}>
									{`${prefix} ${index + 1}.`}
								</label>
							</p>
						)}

						<Input
							{...inputProps}
							className={classnames(inputProps, 'is-expanded')}
							isDisabled={isDisabled}
							id={fieldID}
							onChange={handleItemChange(index)}
							value={currentValue[index] || ''} />
					</div>

					{((currentValue.length > 0) && (index < array.length - 1)) && (
						<Button
							className="is-danger is-light"
							isDisabled={isDisabled}
							onClick={handleRemoveItem(index)}>
							{'Remove Step'}
						</Button>
					)}
				</div>
			</li>
		)
	}, [
		currentValue,
		handleRemoveItem,
		handleItemChange,
		id,
		isDisabled,
		prefix,
		showPrefix,
	])

	return (
		<ol className="multi-input">
			{Array(currentValue.length + 1).fill(null).map(mapItems)}
		</ol>
	)
}

MultiInput.defaultProps = {
	inputProps: {},
	isDisabled: false,
	isRequired: false,
	prefix: '',
	showPrefix: true,
	validate: () => {},
}

MultiInput.propTypes = {
	id: PropTypes.string.isRequired,
	inputProps: PropTypes.object,
	isDisabled: PropTypes.bool,
	isRequired: PropTypes.bool,
	prefix: PropTypes.string,
	showPrefix: PropTypes.bool,
	validate: PropTypes.func,
}
