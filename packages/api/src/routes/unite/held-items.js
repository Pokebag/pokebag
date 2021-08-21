// Module imports
import { promises as fs } from 'fs'
import path from 'path'





// Local imports
import { calculateHeldItemStats } from '../../helpers/unite/calculateHeldItemStats.js'
import { Route } from '../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const SHOULD_CALCULATE_STATS = JSON.parse(context.query['calculate-stats'] ?? 'false')

			const ITEM_DATA_PATH = path.resolve(process.cwd(), 'data', 'unite', context.params.patchVersion, 'held-items')
			const ITEM_FILES = await fs.readdir(ITEM_DATA_PATH)

			const ITEMS = await Promise.all(ITEM_FILES.map(async filename => {
				const FILE_PATH = path.resolve(ITEM_DATA_PATH, filename)
				const FILE_CONTENTS = await fs.readFile(FILE_PATH, 'utf8')
				const ITEM = JSON.parse(FILE_CONTENTS)

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
