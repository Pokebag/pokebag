// Module imports
import {
	useCallback,
	useMemo,
	useState,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { Dropdown } from 'components/Dropdown'
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





// function DropdownOption(props) {
// 	const {
// 		children,
// 		isSelected,
// 		onClick,
// 	} = props

// 	return (
// 		<button
// 			className="button dropdown-item"
// 			onClick={onClick}>
// 			{children}

// 			<span className="icon is-small ml-auto">
// 				<span
// 					className={classnames({
// 						'fa-layers': true,
// 						'fa-fw': true,
// 						'has-text-success': isSelected,
// 					})}>
// 					<FontAwesomeIcon
// 						icon={['far', 'circle']} />

// 					{isSelected && (
// 						<FontAwesomeIcon
// 							icon="check"
// 							transform="shrink-8" />
// 					)}
// 				</span>
// 			</span>
// 		</button>
// 	)
// }

// function StatsFilter(props) {
// 	const {
// 		clearFilters,
// 		filters,
// 		setFilters,
// 		stats,
// 	} = props

// 	const {
// 		allFiltersEnabled,
// 		isFiltered,
// 	} = useMemo(() => {
// 		return Object.values(filters).reduce((accumulator, value) => {
// 			if (value) {
// 				accumulator.isFiltered = true
// 			} else {
// 				accumulator.allFiltersEnabled = false
// 			}

// 			return accumulator
// 		}, {
// 			allFiltersEnabled: true,
// 			isFiltered: false,
// 		})
// 	}, [filters])

// 	const toggleFilter = useCallback(statID => () => {
// 		setFilters(previousValue => {
// 			return {
// 				...previousValue,
// 				[statID]: !previousValue[statID]
// 			}
// 		})
// 	}, [setFilters])

// 	const mapStatFilters = useCallback(([statID, stat]) => {
// 		return (
// 			<DropdownOption
// 				isSelected={filters[statID]}
// 				key={statID}
// 				onClick={toggleFilter(statID)}>
// 				<span>{stat.displayName}</span>
// 			</DropdownOption>
// 		)
// 	}, [filters])

// 	return (
// 		<Dropdown label="Stats">
// 			<DropdownOption
// 				isSelected={!isFiltered || allFiltersEnabled}
// 				onClick={clearFilters}>
// 				<span className="icon is-small">
// 					<span className="fa-layers fa-fw">
// 						<FontAwesomeIcon
// 							icon={['far', 'circle']} />
// 						<FontAwesomeIcon
// 							icon="check"
// 							transform="shrink-8" />
// 					</span>
// 				</span>

// 				<span>
// 					Show all
// 				</span>
// 			</DropdownOption>

// 			<hr className="dropdown-divider" />

// 			{Object.entries(stats).map(mapStatFilters)}
// 		</Dropdown>)
// }

export default function PokemonIndexPage(props) {
	const {
		pokemon: allPokemon,
		// stats,
	} = props

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Pokémon',
			url: '/pokemon',
		},
	])

	const mapPokemon = useCallback(pokemon => {
		// if (
		// 	(activeTagsFilters.length && !pokemon.tags.some(tagID => activeTagsFilters.includes(tagID))) ||
		// 	(activeStatsFilters.length && !Object.keys(pokemon.stats).some(statID => activeStatsFilters.includes(statID)))
		// ) {
		// 	return null
		// }

		return (
			<li
				className="column is-one-quarter"
				key={pokemon.id}>
				<Link href={`/unite/pokemon/${pokemon.id}`}>
					<a>
						<div className="card is-hoverable">
							<div className="card-image p-4">
								<Image
									alt={`Image of ${pokemon.displayName}`}
									blurDataURL={pokemon.blurDataURL}
									priority
									size={256}
									src={pokemon.imageURL} />
							</div>

							<div className="card-content has-text-centered">
								<h3 className="title is-6">{pokemon.displayName}</h3>
							</div>
						</div>
					</a>
				</Link>
			</li>
		)
	}, [
		// activeStatsFilters,
		// activeTagsFilters,
		allPokemon,
	])

	return (
		<Layout title="Pokémon">
			<section className="box section">
				<p className="title is-6">
					Filters
				</p>

				{/* <div className="columns is-vcentered">
					<div className="column is-narrow">
						<TagsFilter
							clearFilters={clearTagsFilters}
							filters={tagsFilters}
							setFilters={setTagsFilters}
							tags={tags} />
					</div>

					<div className="column is-narrow">
						<StatsFilter
							clearFilters={clearStatsFilters}
							filters={statsFilters}
							setFilters={setStatsFilters}
							stats={stats} />
					</div>
				</div> */}
			</section>


			<ul className="columns is-multiline">
				{Object.values(allPokemon).map(mapPokemon)}
			</ul>

			{/* <ul className="columns is-multiline">
				<li className="column is-one-quarter">
					<Link href={`/unite/pokemon/${'pokemon.id'}`}>
						<a>
							<div className="card is-hoverable">
								<div className="card-image">
									<Image
										alt={`Image of ${'pokemon.displayName'}`}
										blurDataURL={'pokemon.blurDataURL'}
										priority
										size={256}
										src={`/images/pokemon/${'pokemon.id'}.png`} />
								</div>

								<div className="card-content has-text-centered">
									<h3 className="title is-6">{'pokemon.displayName'}</h3>
								</div>
							</div>
						</a>
					</Link>
				</li>
			</ul> */}
		</Layout>
	)
}

export async function getStaticProps(context) {
	const [
		{ getPokemonProps },
		{ getStatsProps },
	] = await Promise.all([
		import('helpers/getPokemonProps'),
		import('helpers/getStatsProps'),
	])

	const [
		{ props: statsProps },
		{ props: pokemonProps },
	] = await Promise.all([
		getPokemonProps(context),
		getStatsProps(context),
	])

	return {
		props: {
			...pokemonProps,
			...statsProps,
		},
	}
}
