// Module imports
import {
	useCallback,
	useMemo,
} from 'react'





// Local imports
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { Image } from 'components/Image'





export default function KnownBugsPage(props) {
	const { pokemon } = props

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Known Bugs',
			url: '/known-bugs',
		},
	])

	const dateFormatter = useMemo(() => {
		return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })
	}, [])

	const bugs = useMemo(() => {
		return props.bugs.map(bug => {
			bug.reports = bug.reports.map(report => {
				report.createdAt = dateFormatter.format(new Date(report.createdAt))
				return report
			})

			return bug
		})
	}, [
		dateFormatter,
		props.bugs,
	])

	const mapReport = useCallback(report => {
		return (
			<li key={report.id}>
				<a href="#">{`Reported by ${report.author} on ${report.createdAt}`}</a>
			</li>
		)
	}, [])

	const mapBugs = useCallback(bug => {
		const reports = bug.reports.sort((a, b) => {
			const dateA = new Date(a.createdAt)
			const dateB = new Date(b.createdAt)

			if (dateA > dateB) return 1

			if (dateA < dateB) return -1

			return 0
		})

		const firstReport = reports[0]
		const mon = pokemon[bug.entityID]

		return (
			<section
				className="box section"
				key={bug.id}>
				<header className="content">
					<h3 className="title is-4">{bug.title}</h3>
					<p className="subtitle is-5">{`This bug affects the Pokémon, ${mon.displayName}.`}</p>
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
							<p>{firstReport.createdAt}</p>
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
							alt={`Image of ${mon.displayName}`}
							blurDataURL={mon.blurDataURL}
							priority
							size={256}
							src={mon.imageURL} />
					</div>
				</div>
			</section>
		)
	}, [
		dateFormatter,
		mapReport,
		pokemon,
	])

	return (
		<Layout
			description="This page documents all of the Pokémon UNITE bugs known to Pokébag, as well as their status!"
			title="Known Bugs">
			<PageHeader>
				<h2 className="title">
					{'Known Bugs'}
				</h2>
			</PageHeader>

			{bugs.map(mapBugs)}
		</Layout>
	)
}

export async function getStaticProps(context) {
	const [
		{ getPokemonProps },
		{ getHeldItemsProps },
	] = await Promise.all([
		import('helpers/getPokemonProps'),
		import('helpers/getHeldItemsProps'),
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

			bugs: [
				{
					description: 'When a Pokémon gets hit with with Telekinesis, it is teleported to a completely different match and immediately wins.',
					entityType: 'pokemon',
					entityID: 'slowbro',
					id: '12345',
					reports: [
						{
							author: 'Ash Ketchum',
							createdAt: '2021-06-02T05:00:00.000Z',
							id: '1',
						},
						{
							author: 'Professor Oak',
							createdAt: '2021-07-02T05:00:00.000Z',
							id: '2',
						},
						{
							author: 'Misty',
							createdAt: '2021-09-02T05:00:00.000Z',
							id: '3',
						},
						{
							author: 'Brock',
							createdAt: '2021-08-02T05:00:00.000Z',
							id: '4',
						},
					],
					status: 'Active',
					title: 'Crustle Does Donuts',
				},

				{
					description: 'After pinching Zapdos, Crustle pulls into his shell. A fuse pops out of the top of the shell, slowly burning away. Once the fuse reaches its end, Crustle explodes. Everybody dies. Nobody wins.',
					entityType: 'pokemon',
					entityID: 'crustle',
					id: '67890',
					reports: [
						{
							author: 'James',
							createdAt: '2021-07-02T05:00:00.000Z',
							id: '6',
						},
						{
							author: 'Jesse',
							createdAt: '2021-06-02T05:00:00.000Z',
							id: '5',
						},
					],
					status: 'Active',
					title: 'Blastoise Literally Becomes a Bomb',
				},
			],
		},
	}
}
