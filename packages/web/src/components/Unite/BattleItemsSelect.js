// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import shallow from 'zustand/shallow'





// Local imports
import { Select } from 'components/Forms/Select'
import { useStore } from 'hooks/useStore'





export function BattleItemsSelect() {
	const {
		getBattleItems,
		battleItems,
	} = useStore(state => ({
		getBattleItems: state.unite.getBattleItems,
		battleItems: state.unite.battleItems,
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
			label="Select an item..."
			options={options} />
	)
}
