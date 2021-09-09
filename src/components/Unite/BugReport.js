// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import Link from 'next/link'
import shallow from 'zustand/shallow'





// Local imports
import { Button } from 'components/Button'
import { ConvertBugReportToBugModal } from 'components/Unite/ConvertBugReportToBugModal'
import { Dropdown } from 'components/Dropdown'
import { Image } from 'components/Image'
import { RequirePermissions } from 'components/RequirePermissions'
import { useStore } from 'hooks/useStore'





function mapStepsToReproduce(step, index) {
	return (
		<li key={index}>
			<p>{step}</p>
		</li>
	)
}

export function BugReport(props) {
	const { report } = props
	const {
		getHeldItems,
		getPokemon,
		heldItems,
		pokemon,
	} = useStore(state => ({
		getHeldItems: state.unite.getHeldItems,
		getPokemon: state.unite.getPokemon,
		heldItems: state.unite.heldItems,
		pokemon: state.unite.pokemon,
	}), shallow)

	const [isConvertingToBug, setIsConvertingToBug] = useState(false)

	const dateFormatter = useMemo(() => {
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
	}, [])

	const handleConvertToBugClick = useCallback(() => {
		setIsConvertingToBug(true)
	}, [setIsConvertingToBug])

	const handleConvertToBugClose = useCallback(() => {
		setIsConvertingToBug(false)
	}, [setIsConvertingToBug])

	const entity = useMemo(() => {
		switch (report.entityType) {
			// case 'battle-items':
			// 	entityLabel = 'Battle Item'
			// 	break

			case 'held-items':
				return heldItems?.[report.entityID]

			case 'pokemon':
				return pokemon?.[report.entityID]
		}
	}, [
		heldItems,
		pokemon,
		report.entityID,
		report.entityType,
	])

	useEffect(() => {
		if ((report.entityType === 'pokemon') && !pokemon) {
			getPokemon()
		}

		if ((report.entityType === 'held-items') && !heldItems) {
			getHeldItems()
		}
	}, [
		getHeldItems,
		getPokemon,
		heldItems,
		pokemon,
		report.entityType,
	])

	return (
		<section
			className="box section"
			key={report.id}>
			<div className="columns">
				<div className="column columns is-multiline">
					<div className="column is-full">
						<h4 className="heading">{'Description'}</h4>
						<div className="content">
							<p>{report.description}</p>
						</div>
					</div>

					<div className="column is-half">
						<h4 className="heading">{'Reported by:'}</h4>
						<p>
							<Link href={`/users/${report.authorID}`}>
								{report.author.username}
							</Link>
						</p>
					</div>

					<div className="column is-half">
						<h4 className="heading">{'Reported on:'}</h4>
						<p>{dateFormatter.format(new Date(report.createdAt))}</p>
					</div>

					<div className="column is-half">
						<h4 className="heading">{'Report ID:'}</h4>
						<p>
							<Link href={`/unite/bug-reports/${report.id}`}>
								{report.id}
							</Link>
						</p>
					</div>

					{report.isAcknowledged && (
						<div className="column is-half">
							<h4 className="heading">{'Bug ID:'}</h4>
							<p>
								<Link href={`/unite/bug-reports/${report.bugID}`}>
									{report.bugID}
								</Link>
							</p>
						</div>
					)}

					<div className="column is-full">
						<h4 className="heading">{'Steps to Reproduce:'}</h4>
						<div className="content">
							<ol>{report.stepsToReproduce.map(mapStepsToReproduce)}</ol>
						</div>
					</div>
				</div>

				{Boolean(entity?.imageURL) && (
					<div className="column is-narrow">
						<Image
							alt={`Image of ${entity.displayName}`}
							blurDataURL={entity.blurDataURL}
							priority
							size={256}
							src={entity.imageURL} />
					</div>
				)}
			</div>

			<RequirePermissions permissions={['isModerator']}>
				{!report.bugID && (
					<div className="buttons">
						<Dropdown
							isUp
							label="Actions...">
							<Button
								className="dropdown-item"
								onClick={handleConvertToBugClick}>
								<span className="icon is-small">
									<FontAwesomeIcon
										fixedWidth
										icon="bug" />
								</span>

								<span>Convert to Bug</span>
							</Button>

							<Button className="dropdown-item">
								<span className="icon is-small">
									<FontAwesomeIcon
										fixedWidth
										icon="plus" />
								</span>

								<span>Add to Existing Bug</span>
							</Button>

							<Button className="dropdown-item has-text-danger">
								<span className="icon is-small">
									<FontAwesomeIcon
										fixedWidth
										icon="window-close" />
								</span>

								<span>
									Ignore
								</span>
							</Button>
						</Dropdown>
					</div>
				)}
			</RequirePermissions>

			{isConvertingToBug && (
				<ConvertBugReportToBugModal
					onClose={handleConvertToBugClose}
					report={report} />
			)}
		</section>
	)
}
