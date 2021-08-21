// Module imports
import { promises as fs } from 'fs'
import path from 'path'





// Local imports
import { calculateHeldItemStats } from '../../../helpers/unite/calculateHeldItemStats.js'
import { Route } from '../../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const { itemID } = context.params

			const SHOULD_CALCULATE_STATS = JSON.parse(context.query['calculate-stats'] || 'false')

			const FILE_PATH = path.resolve(process.cwd(), 'data', 'unite', context.params.patchVersion, 'held-items', `${itemID}.json`)
			const FILE_CONTENTS = await fs.readFile(FILE_PATH, 'utf8')
			const ITEM = JSON.parse(FILE_CONTENTS)

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
