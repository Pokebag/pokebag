// Module imports
import create from 'zustand-store-addons'
import produce from 'immer'






// Local imports
import * as API from 'helpers/API'
// import { persist } from 'helpers/zustandPersist'





// Constants
const immer = config => (setState, getState, api) => config((partial, replace) => {
	let processedPartial = partial

	if (typeof partial === 'function') {
		processedPartial = produce(partial)
	}

	return setState(processedPartial, replace)
}, getState, api)





export const useStore = create((setState, getState) => {
	return {
		breadcrumbs: [],
		isModalOpen: false,
		unite: {
			entityTypes: {
				'battle-items': 'Battle Item',
				'held-items': 'Held Item',
				pokemon: 'Pokémon',
			},

			battleItems: null,
			bugs: null,
			heldItems: null,
			isGettingBugs: false,
			isGettingHeldItems: false,
			isGettingPokemon: false,
			isIgnoringBugReport: false,
			isSavingBug: false,
			pokemon: null,

			getBattleItems: async () => {
				// const response = await API.getUniteBattleItems()
				setState(state => {
					state.unite.battleItems = {
						'eject-button': {
							displayName: 'Eject Button',
							id: 'eject-button',
						},
						'fluffy-tail': {
							displayName: 'Fluffy Tail',
							id: 'fluffy-tail',
						},
						'full-heal': {
							displayName: 'Full Heal',
							id: 'full-heal',
						},
						'goal-getter': {
							displayName: 'Goal Getter',
							id: 'goal-getter',
						},
						'potion': {
							displayName: 'Potion',
							id: 'potion',
						},
						'slow-smoke': {
							displayName: 'Slow Smoke',
							id: 'slow-smoke',
						},
						'x-attack': {
							displayName: 'X Attack',
							id: 'x-attack',
						},
						'x-speed': {
							displayName: 'X Speed',
							id: 'x-speed',
						},
					}
				})
			},

			getBugs: async () => {
				if (getState().isGettingBugs) return

				setState(state => {
					state.unite.isGettingBugs = true
				})

				const response = await fetch('/api/unite/bugs')
				const responseJSON = await response.json()

				setState(state => {
					state.unite.bugs = responseJSON.data.bugs
					state.unite.isGettingBugs = false
				})
			},

			getHeldItems: async () => {
				if (getState().isGettingHeldItems) return

				setState(state => {
					state.unite.isGettingHeldItems = true
				})

				const response = await API.getUniteHeldItems()

				Object.values(response.data.items).forEach(item => {
					item.imageURL = `/images/items/${item.id}.png`
				})

				setState(state => {
					state.unite.heldItems = response.data.items
					state.unite.isGettingHeldItems = false
				})
			},

			getPokemon: async () => {
				if (getState().isGettingPokemon) return

				setState(state => {
					state.unite.isGettingPokemon = true
				})

				const response = await API.getUnitePokemon()

				Object.values(response.data.pokemon).forEach(mon => {
					mon.imageURL = `/images/games/unite/pokemon/${mon.id}.png`
				})

				setState(state => {
					state.unite.isGettingPokemon = false
					state.unite.pokemon = response.data.pokemon
				})
			},

			ignoreBugReport: async reportID => {
				if (getState().isIgnoringBugReport) return

				setState(state => {
					state.unite.isIgnoringBugReport = true
				})

				await firestore
					.collection('bug-reports')
					.doc(reportID)
					.update({
						isIgnored: true,
					})

				setState(state => {
					state.unite.isIgnoringBugReport = false
				})
			},

			saveBug: async bug => {
				let bugID = null

				setState(state => {
					state.unite.isSavingBug = true
				})

				try {
					const response = await fetch('/api/unite/bugs', {
						body: JSON.stringify(bug),
						headers: {
							'Content-Type': 'application/json',
						},
						method: 'post',
					})
					const responseJSON = await response.json()
					bugID = responseJSON.id
				} catch(error) {}

				setState(state => {
					state.unite.isSavingBug = false
				})

				return bugID
			},

			setHeldItems: async heldItems => setState(state => {
				state.unite.heldItems = heldItems
			}),

			setPokemon: async pokemon => setState(state => {
				state.unite.pokemon = pokemon
			}),
		},

		setBreadcrumbs: breadcrumbs => setState(state => {
			state.breadcrumbs = breadcrumbs
		}),

		setIsModalOpen: isModalOpen => {
			document
				.querySelector('html')
				.classList[isModalOpen ? 'add' : 'remove']('is-clipped')
		},
	}
}, {
	middleware: [immer],
})

if ((process.env.NODE_ENV === 'development') && (typeof window !== 'undefined')) {
	(async () => {
		const { mountStoreDevtool } = await import('simple-zustand-devtools')
		mountStoreDevtool('Firebase Store', useStore)
	})()
}
