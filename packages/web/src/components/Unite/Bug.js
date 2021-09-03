// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Local imports
import { Button } from 'components/Button'
import { Dropdown } from 'components/Dropdown'
import { Image } from 'components/Image'





export function Bug(props) {
	const {
		bug,
		items,
		pokemon,
	} = props

	const dateFormatter = useMemo(() => {
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
	}, [])

	const reports = useMemo(() => {
		return [...bug.reports].sort((a, b) => {
			const dateA = new Date(a.createdAt)
			const dateB = new Date(b.createdAt)

			if (dateA > dateB) return 1

			if (dateA < dateB) return -1

			return 0
		})
	}, [bug.reports])

	const {
		entity,
		entityLabel,
	} = useMemo(() => {
		switch (bug.entityType) {
			case 'battle-item':
				return {
					entityLabel: 'Battle Item',
				}

			case 'held-item':
				return {
					entity: items[bug.entityID],
					entityLabel: 'Held Item',
				}

			case 'pokemon':
				return {
					entity: pokemon[bug.entityID],
					entityLabel: 'Pokémon',
				}
		}
	}, [
		bug.entityID,
		bug.entityType,
	])

	const mapReport = useCallback(report => {
		return (
			<li key={report.id}>
				<a href="#">{`Reported by ${report.author} on ${dateFormatter.format(new Date(report.createdAt))}`}</a>
			</li>
		)
	}, [dateFormatter])

	const firstReport = reports[0]

	return (
		<section
			className="box section"
			key={bug.id}>
			<header className="content">
				<h3 className="title is-4">{bug.title}</h3>
				<p className="subtitle is-5">{`This bug affects the ${entityLabel}, ${entity.displayName}.`}</p>
			</header>

			<div className="columns">
				<div className="column columns is-multiline">
					<div className="column is-full">
						<h4 className="heading">{'Description'}</h4>
						<div className="content">
							<p>{bug.description}</p>
						</div>
					</div>

					<div className="column">
						<h4 className="heading">{'First reported by:'}</h4>
						<p>
							<a href="#">{firstReport.author}</a>
						</p>
					</div>

					<div className="column">
						<h4 className="heading">{'First reported on:'}</h4>
						<p>{dateFormatter.format(new Date(firstReport.createdAt))}</p>
					</div>

					<div className="column">
						<h4 className="heading">{'Bug ID:'}</h4>
						<p>
							<a href="#">{bug.id}</a>
						</p>
					</div>

					<div className="column">
						<h4 className="heading">{'Status:'}</h4>
						<p className="has-text-danger">{bug.status}</p>
					</div>

					<div className="column is-full">
						<h4 className="heading">
							{'Related reports'}
						</h4>

						<div className="content">
							<ul>
								{reports.map(mapReport)}
							</ul>
						</div>
					</div>
				</div>

				<div className="column is-narrow">
					<Image
						alt={`Image of ${entity.displayName}`}
						blurDataURL={entity.blurDataURL}
						priority
						size={256}
						src={entity.imageURL} />
				</div>
			</div>
		</section>
	)
}
