export function calculateHeldItemStats(item) {
	const CALCULATED_STATS = {}

	for (let index = 0; index < 30; index ++) {
		const LVL = index + 1

		CALCULATED_STATS[LVL] = {
			lvl: LVL,
			value: Object.entries(item.stats)
				.reduce((accumulator, [statID, statData]) => {
					const COMPLETE_FORMULA = statData.formula.replace(/\{lvl\}/, LVL)

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
