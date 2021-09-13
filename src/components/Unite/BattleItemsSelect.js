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





export function BattleItemsSelect(props) {
	const { isRequired } = props

	const {
		battleItems,
		getBattleItems,
	} = useStore(state => ({
		battleItems: state.unite.battleItems,
		getBattleItems: state.unite.getBattleItems,
	}), shallow)

	const options = useMemo(() => {
		return Object.values(battleItems || {}).map(mon => ({
			label: mon.displayName,
			value: mon.id,
		}))
	}, [battleItems])

	useEffect(() => {
		if (!battleItems) getBattleItems()
	}, [
		getBattleItems,
		battleItems,
	])

	return (
		<Select
			id="entityID"
			isLoading={!battleItems}
			isRequired={isRequired}
			label="Select an item..."
			options={options} />
	)
}

BattleItemsSelect.defaultProps = {
	isRequired: false,
}

BattleItemsSelect.propTypes = {
	isRequired: PropTypes.bool,
}
