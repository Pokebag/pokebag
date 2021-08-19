// Module imports
// import { mountStoreDevtool } from 'simple-zustand-devtools'
import create from 'zustand-store-addons'
import produce from 'immer'






// Local imports
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

// if (process.env.NODE_ENV === 'development') {
// 	mountStoreDevtool('LogStore', store)
// }
