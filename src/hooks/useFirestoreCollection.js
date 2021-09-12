// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
} from 'react'
import shallow from 'zustand/shallow'





// Local imports
import {
	generateKey,
	useFirebaseStore,
} from 'hooks/useFirebaseStore'





export function useFirestoreCollection(options, dependencies = []) {
	const { collectionName } = options
	const documentIDs = useMemo(() => {
		if (options.documentIDs) {
			return Array.from(new Set(options.documentIDs))
		}

		return undefined
	}, [options.documentIDs])

	const {
		connectCollection,
		data,
		disconnectCollection,
	} = useFirebaseStore(useCallback(state => ({
		connectCollection: state.actions.connectCollection,
		data: state.data[generateKey(options)],
		disconnectCollection: state.actions.disconnectFirestoreConnection,
	})), shallow)

	useEffect(() => {
		connectCollection(options)
		return () => disconnectCollection(generateKey(options))
	}, [
		...dependencies,
		connectCollection,
		disconnectCollection,
		documentIDs,
		collectionName,
		options.queries,
	])

	return data
}
