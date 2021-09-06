// Module imports
import {
	Fragment,
	useCallback,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





// Constants
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'





function Marks(props) {
	const {
		displaySteps,
		id,
		max,
		min,
	} = props

	let step = props.step || 1

	if (!props.step && max <= 1) {
		step = 0.1
	}

	const valueRange = (max - min) + 1
	const markCount = valueRange / step
	const marks = Array(markCount).fill(null)

	const mapMarks = useCallback((_, index) => {
		const markValue = step * (index + 1)

		return (
			<li
				key={markValue}
				data-value={displaySteps?.includes(markValue) ? markValue : null}
				value={markValue} />
		)
	}, [])

	return (
		<ol
			className="range-slider-marks"
			id={`range-slider:${id}:marks`}>
			{marks.map(mapMarks)}
		</ol>
	)
}

export function RangeSlider(props) {
	const {
		hasMarks,
		id,
		label,
		max,
		min,
		onChange,
		values,
	} = props

	const rangeSliderStyles = {
		'--min': min,
		'--max': max,
	}

	const handleValueChange = useCallback(event => {
		const newValues = [...values]
		const index = Number(event.target.getAttribute('data-index'))
		newValues[index] = Number(event.target.value)
		onChange(newValues)
	}, [
		onChange,
		values,
	])

	const sliders = useMemo(() => {
		return values.map((value, index) => {
			const valueID = ALPHABET[index]

			let list = null

			if (index === 0) {
				list = `range-slider:${id}:marks`
			}

			rangeSliderStyles[`--value-${valueID}`] = value

			return (
				<Fragment key={valueID}>
					<label
						className="sr-only"
						htmlFor={`range-slider:${id}:value:${valueID}`}>
						Value A
					</label>

					<input
						data-index={index}
						id={`range-slider:${id}:value:${valueID}`}
						list={list}
						max={max}
						min={min}
						onChange={handleValueChange}
						type="range"
						value={value} />
				</Fragment>
			)
		}, [])
	}, [
		id,
		max,
		min,
		values,
	])

	return (
		<div
			aria-labelledby={Boolean(label) ? `range-slider:${id}:label` : null}
			className="range-slider"
			role="group"
			style={rangeSliderStyles}>
			{Boolean(label) && (
				<div id={`range-slider:${id}:label`}>
					{label}
				</div>
			)}

			{sliders}

			{hasMarks && (
				<Marks {...props} />
			)}
		</div>
	)
}

RangeSlider.defaultProps = {
	displaySteps: null,
	hasMarks: false,
	label: '',
	onChange: () => {},
	step: 1,
}

RangeSlider.propTypes = {
	displaySteps: PropTypes.arrayOf(PropTypes.number),
	hasMarks: PropTypes.bool,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	max: PropTypes.number.isRequired,
	min: PropTypes.number.isRequired,
	onChange: PropTypes.func,
	step: PropTypes.number,
	values: PropTypes.arrayOf(PropTypes.number).isRequired,
}
