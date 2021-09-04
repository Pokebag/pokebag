// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
} from 'react'
import shallow from 'zustand/shallow'





// Local imports
import { Image } from 'components/Image'
import { useStore } from 'hooks/useStore'





export function Bug(props) {
	const { bug } = props

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
			case 'battle-items':
				return {
					entityLabel: 'Battle Item',
				}

			case 'held-items':
				return {
					entity: heldItems?.[bug.entityID],
					entityLabel: 'Held Item',
				}

			case 'pokemon':
				return {
					entity: pokemon?.[bug.entityID],
					entityLabel: 'Pokémon',
				}
		}
	}, [
		bug.entityID,
		bug.entityType,
		heldItems,
		pokemon,
	])

	const isLoading = useMemo(() => {
		return ((bug.entityType === 'pokemon') && !pokemon) || ((bug.entityType === 'held-items') && !heldItems)
	}, [
		bug.entityType,
		pokemon,
		heldItems,
	])

	const mapReport = useCallback(report => {
		return (
			<li key={report.id}>
				<a href="#">{`Reported by ${report.author} on ${dateFormatter.format(new Date(report.createdAt))}`}</a>
			</li>
		)
	}, [dateFormatter])

	useEffect(() => {
		if ((bug.entityType === 'pokemon') && !pokemon) {
			getPokemon()
		}

		if ((bug.entityType === 'held-items') && !heldItems) {
			getHeldItems()
		}
	}, [
		getHeldItems,
		getPokemon,
		heldItems,
		pokemon,
	])

	const firstReport = reports[0]

	return (
		<section
			className="box section"
			key={bug.id}>
			{isLoading && (
				'Loading...'
			)}

			{!isLoading && (
				<>
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
				</>
			)}
		</section>
	)
}
