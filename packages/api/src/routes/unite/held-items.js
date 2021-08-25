// Local imports
import { calculateHeldItemStats } from '../../helpers/unite/calculateHeldItemStats.js'
import { getDirectoryAtPatchVersion } from '../../helpers/unite/getDirectoryAtPatchVersion.js'
import { getFileAtPatchVersion } from '../../helpers/unite/getFileAtPatchVersion.js'
import { Route } from '../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const SHOULD_CALCULATE_STATS = JSON.parse(context.query['calculate-stats'] || 'false')

			const ITEM_FILES = await getDirectoryAtPatchVersion('held-items', context.params.patchVersion)

			const ITEMS = await Promise.all(ITEM_FILES.map(async filename => {
				const ITEM = await getFileAtPatchVersion(`held-items/${filename}`, context.params.patchVersion)

				if (SHOULD_CALCULATE_STATS) {
					ITEM.stats = calculateHeldItemStats(ITEM)
				}

				return {
					id: filename.replace(/\.json$/, ''),
					data: ITEM,
				}
			}))

			context.data = {
				items: ITEMS.reduce((accumulator, { id, data }) => {
					data.id = id
					accumulator[id] = data
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
