export function calculateHeldItemStats(item) {
	const CALCULATED_STATS = {}

	for (let index = 0; index < 30; index ++) {
		const lvl = index + 1

		CALCULATED_STATS[lvl] = {
			lvl,
			value: Object.entries(item.stats)
				.reduce((accumulator, [statID, statData]) => {
					const COMPLETE_FORMULA = statData.formula.replace(/\{lvl\}/, (index + 1))

					accumulator[statID] = parseFloat(eval(COMPLETE_FORMULA))

					if (statData.type === 'percentage') {
						accumulator[statID] = `${accumulator[statID]}%`
					}

					return accumulator
				}, {}),
		}
	}

	return CALCULATED_STATS
}
