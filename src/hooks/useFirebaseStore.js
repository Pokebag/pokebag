// Module imports
import create from 'zustand-store-addons'
import produce from 'immer'






// Local imports
import { firestore } from 'helpers/firebase'
// import { persist } from 'helpers/zustandPersist'





// Constants
const immer = config => (setState, getState, api) => config((partial, replace) => {
	let processedPartial = partial

	if (typeof partial === 'function') {
		processedPartial = produce(partial)
	}

	return setState(processedPartial, replace)
}, getState, api)





export function generateKey (options) {
	const {
		collectionName,
		documentIDs,
	} = options
	let key = collectionName

	if (documentIDs) {
		key += `/${documentIDs.join(',')}`
	}

	return key
}

export const useFirebaseStore = create((setState, getState) => {
	return {
		actions: {
			connectCollection: async options => {
				const {
					collectionName,
					documentIDs,
				} = options
				const key = generateKey(options)

				setState(state => {
					if (state.connections[key]) {
						state.connections[key].count += 1
					} else if (documentIDs) {
						if (!documentIDs.length) {
							return
						}

						const unsubscribes = []

						documentIDs.forEach(documentID => {
							unsubscribes.push(firestore
								.collection(collectionName)
								.doc(documentID)
								.onSnapshot(snapshot => {
									getState().actions.handleDocumentCollectionSnapshot(key, snapshot)
								}))
						})

						state.connections[key] = {
							count: 1,
							unsubscribe: () => unsubscribes.forEach(unsubscribe => unsubscribe()),
						}

						state.data[key] = null
					} else {
						state.connections[key] = {
							count: 1,
							unsubscribe: firestore
								.collection(collectionName)
								.onSnapshot(snapshot => {
									getState().actions.handleCollectionSnapshot(key, snapshot)
								}),
						}
						state.data[key] = null
					}
				})

				return key
			},

			connectDocument: async options => {
				const {
					collectionName,
					documentID,
				} = options
				const key = generateKey(options)

				setState(state => {
					if (state.connections[key]) {
						state.connections[key].count += 1
					} else {
						state.connections[key] = {
							count: 1,
							unsubscribe: firestore
								.collection(collectionName)
								.doc(documentID)
								.onSnapshot(snapshot => {
									getState().actions.handleDocumentSnapshot(key, snapshot)
								}),
						}
						state.data[key] = null
					}
				})

				return key
			},

			disconnectFirestoreConnection: key => {
				setState(state => {
					const connectionData = state.connections[key]

					if (connectionData) {
						if (connectionData.count <= 1) {
							connectionData.unsubscribe()
							delete state.connections[key]
							delete state.data[key]
						} else {
							connectionData.count -= 1
						}
					}
				})
			},

			handleCollectionSnapshot: (key, collectionSnapshot) => {
				setState(state => {
					state.data[key] = []

					collectionSnapshot.docChanges().forEach(change => {
						const {
							doc,
							type,
						} = change

						if (type !== 'removed') {
							state.data[key].push({
								...doc.data(),
								id: doc.id,
							})
						}
					})
				})
			},

			handleDocumentSnapshot: (key, documentSnapshot) => {
				setState(state => {
					state.data[key] = {
						id: documentSnapshot.id,
						...documentSnapshot.data(),
					}
				})
			},

			handleDocumentCollectionSnapshot: (key, documentSnapshot) => {
				setState(state => {
					if (!state.data[key]) {
						state.data[key] = {}
					}

					state.data[key][documentSnapshot.id] = {
						id: documentSnapshot.id,
						...documentSnapshot.data(),
					}
				})
			},
		},

		connections: {},

		data: {},
	}
}, {
	middleware: [immer],
})

if ((process.env.NODE_ENV === 'development') && (typeof window !== 'undefined')) {
	(async () => {
		const { mountStoreDevtool } = await import('simple-zustand-devtools')
		mountStoreDevtool('Firebase Store', useFirebaseStore)
	})()
}
