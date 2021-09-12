// Module imports
import {
	useEffect,
	useMemo,
} from 'react'
import shallow from 'zustand/shallow'





// Local imports
import { Select } from 'components/Forms/Select'
import { useStore } from 'hooks/useStore'





export function HeldItemsSelect() {
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
			label="Select an item..."
			options={options} />
	)
}
