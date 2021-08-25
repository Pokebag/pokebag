// Local imports
import { calculateHeldItemStats } from '../../../helpers/unite/calculateHeldItemStats.js'
import { getFileAtPatchVersion } from '../../../helpers/unite/getFileAtPatchVersion.js'
import { Route } from '../../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const { itemID } = context.params

			const SHOULD_CALCULATE_STATS = JSON.parse(context.query['calculate-stats'] || 'false')

			const ITEM = await getFileAtPatchVersion(`held-items/${itemID}.json`, context.params.patchVersion)

			ITEM.id = itemID

			if (SHOULD_CALCULATE_STATS) {
				ITEM.stats = calculateHeldItemStats(ITEM)
			}

			context.data = {
				items: {
					[itemID]: ITEM,
				},
			}
		} catch(error) {
			console.log(error)
			context.errors.push(error.message)
		}
	},
	route: '/unite/:patchVersion/held-items/:itemID',
})
