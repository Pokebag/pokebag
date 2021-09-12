// Module imports
import {
	useCallback,
	useEffect,
} from 'react'
import shallow from 'zustand/shallow'





// Local imports
import {
	generateKey,
	useFirebaseStore,
} from 'hooks/useFirebaseStore'





export function useFirestoreDocument(options) {
	const {
		collectionName,
		documentID,
	} = options

	const {
		connectDocument,
		data,
		disconnectDocument,
	} = useFirebaseStore(useCallback(state => {
		return {
			connectDocument: state.connectDocument,
			data: state.data[generateKey(options)],
			disconnectDocument: state.disconnectFirestoreConnection,
		}
	}), shallow)

	useEffect(() => {
		const key = connectDocument({
			collectionName,
			documentID,
		})
		return () => disconnectDocument(key)
	}, [
		collectionName,
		connectDocument,
		disconnectDocument,
	])

	return data
}
