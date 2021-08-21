// Module imports
import fs from 'fs/promises'
import path from 'path'





// Local imports
import Route from '../structures/Route.js'





// Constants
const IS_DEV = process.env.NODE_ENV !== 'production'
// const sourceDirectory = path.resolve(process.cwd(), 'src')





export const route = new Route({
	handler: async context => {
		try {
			const shouldCalculate = JSON.parse(context.query.calculated)

			const ITEM_DATA_PATH = path.resolve(process.cwd(), 'data', context.params.patchVersion, 'held-items')
			const ITEM_FILES = await fs.readdir(ITEM_DATA_PATH)

			const ITEMS = await Promise.all(ITEM_FILES.map(async filename => {
				const FILE_PATH = path.resolve(ITEM_DATA_PATH, filename)
				const FILE_CONTENTS = await fs.readFile(FILE_PATH, 'utf8')
				const FILE_JSON = JSON.parse(FILE_CONTENTS)

				if (shouldCalculate) {
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
			context.errors.push(error.message)
		}
	},
	route: '/:patchVersion/held-items',
})
