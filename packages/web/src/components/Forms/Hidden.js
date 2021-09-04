// Module imports
import { useEffect } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { useForm } from 'components/Forms/Form'





export function Hidden(props) {
	const {
		autocomplete,
		id,
	} = props
	const {
		updateValidity,
		values,
	} = useForm()

	useEffect(() => updateValidity(id, []), [])

	return (
		<input
			autoComplete={autocomplete}
			type="hidden"
			value={values[id]} />
	)
}

Hidden.defaultProps = {
	autocomplete: 'off',
}

Hidden.propTypes = {
	autocomplete: PropTypes.string,
	id: PropTypes.string.isRequired,
}
