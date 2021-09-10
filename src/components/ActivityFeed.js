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
		const currentItemMonth = currentItemDate.getMonth()
		const currentItemYear = currentItemDate.getFullYear()

		const previousItem = array[index - 1]

		let shouldRenderMonth = true
		let shouldRenderYear = true

		if (previousItem) {
			const previousItemDate = getDate(previousItem)
			const previousItemMonth = previousItemDate.getMonth()
			const previousItemYear = previousItemDate.getFullYear()

			shouldRenderMonth = previousItemMonth !== currentItemMonth
			shouldRenderYear = previousItemYear !== currentItemYear
		}

		return (
			<Fragment key={index}>
				{shouldRenderYear && (
					<>
						<header className="timeline-header">
							<span className="tag is-medium is-primary">{currentItemYear}</span>
						</header>

						<div className="timeline-item" />
					</>
				)}

				{shouldRenderMonth && (
					<header className="timeline-header">
						<span className="tag is-medium">{currentItemMonth}</span>
					</header>
				)}

				<div className="timeline-item">
					<div className="timeline-marker"></div>
					<div className="timeline-content">
						<p className="heading">{dateFormatter.format(getDate(item))}</p>

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
