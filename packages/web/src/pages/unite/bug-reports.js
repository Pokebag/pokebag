// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Local imports
import { Button } from 'components/Button'
import { Dropdown } from 'components/Dropdown'
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





function mapStepsToReproduce(step, index) {
	return (
		<li key={index}>
			<p>{step}</p>
		</li>
	)
}

export default function ReportABugPage(props) {
	const {
		items,
		pokemon,
	} = props
	const [bugReports, setBugReports] = useState(null)

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Bug Reports',
			url: '/bug-reports',
		},
	])

	const dateFormatter = useMemo(() => {
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
	}, [])

	const mapBugReports = useCallback(report => {
		let entity = null
		let entityLabel = null

		switch (report.entityType) {
			case 'battle-item':
				entityLabel = 'Battle Item'
				break

			case 'held-item':
				entity = items[report.entityID]
				entityLabel = 'Held Item'
				break

			case 'pokemon':
				entity = pokemon[report.entityID]
				entityLabel = 'Pokémon'
				break
		}

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

						<div className="column is-one-third">
							<h4 className="heading">{'Reported by:'}</h4>
							<p>
								<Link href={`/users/${report.authorID}`}>
									{report.author.username}
								</Link>
							</p>
						</div>

						<div className="column is-one-third">
							<h4 className="heading">{'Reported on:'}</h4>
							<p>{report.createdAt}</p>
						</div>

						<div className="column is-one-third">
							<h4 className="heading">{'Report ID:'}</h4>
							<p>
								<Link href={`/unite/bug-reports/${report.id}`}>
									{report.id}
								</Link>
							</p>
						</div>

						<div className="column is-full">
							<h4 className="heading">{'Steps to Reproduce:'}</h4>
							<div className="content">
								<ol>{report.stepsToReproduce.map(mapStepsToReproduce)}</ol>
							</div>
						</div>
					</div>

					{Boolean(entity.imageURL) && (
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

				<div className="buttons">
					<Dropdown
						isUp
						label="Actions...">
						<Button className="dropdown-item">
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
			</section>
		)
	}, [
		items,
		pokemon,
	])

	useEffect(async () => {
		const response = await fetch('/api/unite/bug-reports')
		const responseJSON = await response.json()

		setBugReports(responseJSON.bugReports.map(report => {
			report.createdAt = dateFormatter.format(new Date(report.createdAt))
			return report
		}))
	}, [
		dateFormatter,
		setBugReports,
	])

	return (
		<Layout
			title="Report a Bug">
			<PageHeader>
				<h2 className="title">
					{'Bug Reports'}
				</h2>
			</PageHeader>

			{Boolean(bugReports) && bugReports.map(mapBugReports)}

			{!bugReports && (
				<section className="box section">
					Loading bug reports...
				</section>
			)}
		</Layout>
	)
}

export async function getStaticProps(context) {
	const [
		{ getHeldItemsProps },
		{ getPokemonProps },
	] = await Promise.all([
		import('helpers/getHeldItemsProps'),
		import('helpers/getPokemonProps'),
	])

	const [
		{ props: heldItemsProps },
		{ props: pokemonProps },
	] = await Promise.all([
		getHeldItemsProps(context),
		getPokemonProps(context),
	])

	return {
		props: {
			...heldItemsProps,
			...pokemonProps,
		},
	}
}
