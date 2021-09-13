// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'





// Local imports
import { Select } from 'components/Forms/Select'
import { useStore } from 'hooks/useStore'





export function HeldItemsSelect(props) {
	const { isRequired } = props

	const {
		getHeldItems,
		heldItems,
	} = useStore(state => ({
		getHeldItems: state.unite.getHeldItems,
		heldItems: state.unite.heldItems,
	}), shallow)

	const options = useMemo(() => {
		return Object.values(heldItems || {}).map(mon => ({
			label: mon.displayName,
			value: mon.id,
		}))
	}, [heldItems])

	useEffect(() => {
		if (!heldItems) getHeldItems()
	}, [
		getHeldItems,
		heldItems,
	])

	return (
		<Select
			id="entityID"
			isLoading={!heldItems}
			isRequired={isRequired}
			label="Select an item..."
			options={options} />
	)
}

HeldItemsSelect.defaultProps = {
	isRequired: false,
}

HeldItemsSelect.propTypes = {
	isRequired: PropTypes.bool,
}
