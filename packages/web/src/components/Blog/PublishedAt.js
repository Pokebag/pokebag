// Module imports
import { useMemo } from 'react'





export function PublishedAt(props) {
	const {
		layout,
		timestamp,
	} = props

	const {
		dateParts,
		dateString,
		timeParts,
		timeString,
	} = useMemo(() => {
		const publishedAtDate = new Date(timestamp)

		const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
		const timeFormatter = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' })

		return {
			dateParts: dateFormatter.formatToParts(publishedAtDate),
			dateString: dateFormatter.format(publishedAtDate),
			timeParts: timeFormatter.formatToParts(publishedAtDate),
			timeString: timeFormatter.format(publishedAtDate),
		}
	}, [timestamp])

	if (layout === 'block') {
		return (
			<time
				className="block-date notification"
				dateTime={timestamp}>
				<span className="month">{dateParts[0].value}</span>
				<span className="date">{dateParts[2].value}</span>
			</time>
		)
	}

	return (
		<>Published on <time dateTime={timestamp}>{dateString} at {timeString}</time></>
	)
}
