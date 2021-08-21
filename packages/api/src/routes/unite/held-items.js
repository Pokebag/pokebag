// Module imports
import { promises as fs } from 'fs'
import path from 'path'





// Local imports
import { Route } from '../../structures/Route.js'





export const route = new Route({
	handler: async context => {
		try {
			const shouldCalculateStats = JSON.parse(context.query['calculate-stats'] ?? 'false')

			const ITEM_DATA_PATH = path.resolve(process.cwd(), 'data', 'unite', context.params.patchVersion, 'held-items')
			const ITEM_FILES = await fs.readdir(ITEM_DATA_PATH)

			const ITEMS = await Promise.all(ITEM_FILES.map(async filename => {
				const FILE_PATH = path.resolve(ITEM_DATA_PATH, filename)
				const FILE_CONTENTS = await fs.readFile(FILE_PATH, 'utf8')
				const FILE_JSON = JSON.parse(FILE_CONTENTS)

				if (shouldCalculateStats) {
					const CALCULATED_STATS = {
						1: {
							lvl: 1,
							value: 'foo',
						}
					}

					for (let index = 0; index < 30; index ++) {
						const lvl = index + 1

						CALCULATED_STATS[lvl] = {
							lvl,
							value: Object.entries(FILE_JSON.stats)
								.reduce((accumulator, [statID, statData]) => {
									const COMPLETE_FORMULA = statData.formula.replace(/\{lvl\}/, (index + 1))

									accumulator[statID] = parseFloat(eval(COMPLETE_FORMULA))

									return accumulator
								}, {}),
						}
					}

					FILE_JSON.stats = CALCULATED_STATS
				}

				return {
					id: filename.replace(/\.json$/, ''),
					data: FILE_JSON,
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
