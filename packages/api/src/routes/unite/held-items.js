// Module imports
import { getHeldItems } from '@pokebag/data-sdk'





// Local imports
import { calculateHeldItemStats } from '../../helpers/unite/calculateHeldItemStats.js'
import { Route } from '../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const SHOULD_CALCULATE_STATS = JSON.parse(context.query['calculate-stats'] || 'false')

			const ITEMS = await getHeldItems({ patch: context.params.patchVersion })

			if (SHOULD_CALCULATE_STATS) {
				ITEMS.forEach(item => {
					item.stats = calculateHeldItemStats(item)
				})
			}

			context.data = {
				items: ITEMS.reduce((accumulator, item) => {
					accumulator[item.id] = item
					return accumulator
				}, {}),
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	},
	route: '/unite/:patchVersion/held-items',
})
