// Module imports
import {
	cloneElement,
	Fragment,
	useCallback,
	useMemo,
} from 'react'
import PropTypes from 'prop-types'





export function ActivityFeed (props) {
	const {
		getDate,
		itemComponent,
		items,
	} = props

	const dateFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }), [])

	const sortItems = useCallback((a, b) => {
		const dateA = getDate(a)
		const dateB = getDate(b)

		if (dateA > dateB) return -1

		if (dateA < dateB) return 1

		return 0
	}, [getDate])

	const sortedItems = useMemo(() => {
		return [...items].sort(sortItems)
	}, [
		items,
		sortItems,
	])

	const mapItems = useCallback((item, index, array) => {
		const currentItemDate = getDate(item)
		const currentItemDay = currentItemDate.getDate()
		const currentItemMonth = currentItemDate.getMonth()
		const currentItemYear = currentItemDate.getFullYear()

		const previousItem = array[index - 1]

		let shouldRenderDay = true
		let shouldRenderMonth = true
		let shouldRenderYear = true

		if (previousItem) {
			const previousItemDate = getDate(previousItem)
			const previousItemDay = previousItemDate.getDate()
			const previousItemMonth = previousItemDate.getMonth()
			const previousItemYear = previousItemDate.getFullYear()

			shouldRenderYear = previousItemYear !== currentItemYear
			shouldRenderMonth = shouldRenderYear || (previousItemMonth !== currentItemMonth)
			shouldRenderDay = shouldRenderMonth || (previousItemDay !== currentItemDay)
		}

		const yearFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric' })
		const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' })
		const dayFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

		return (
			<Fragment key={index}>
				{shouldRenderYear && (
					<>
						<header className="timeline-header">
							<span className="tag is-medium is-primary">{yearFormatter.format(currentItemDate)}</span>
						</header>

						<div className="timeline-item" />
					</>
				)}

				{shouldRenderMonth && (
					<header className="timeline-header">
						<span className="tag is-medium">{monthFormatter.format(currentItemDate)}</span>
					</header>
				)}

				<div className="timeline-item">
					<div className="timeline-marker"></div>
					<div className="timeline-content">
						{shouldRenderDay && (
							<p className="heading">{dayFormatter.format(currentItemDate)}</p>
						)}

						{cloneElement(itemComponent, { item })}
					</div>
				</div>
			</Fragment>
		)
	}, [
		dateFormatter,
		getDate,
	])

	const renderedItems = useMemo(() => sortedItems.map(mapItems), [
		mapItems,
		sortedItems,
	])

	return (
		<div className="timeline">
			{renderedItems}

			<div className="timeline-header">
				<span className="tag is-medium">The End</span>
			</div>
		</div>
	)
}

ActivityFeed.propTypes = {
	getDate: PropTypes.func.isRequired,
	itemComponent: PropTypes.node.isRequired,
	items: PropTypes.array.isRequired,
}
