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





function DropdownOption(props) {
	const {
		children,
		isSelected,
		onClick,
	} = props

	return (
		<button
			className="button dropdown-item"
			onClick={onClick}>
			{children}

			<span className="icon is-small ml-auto">
				<span
					className={classnames({
						'fa-layers': true,
						'fa-fw': true,
						'has-text-success': isSelected,
					})}>
					<FontAwesomeIcon
						icon={['far', 'circle']} />

					{isSelected && (
						<FontAwesomeIcon
							icon="check"
							transform="shrink-8" />
					)}
				</span>
			</span>
		</button>
	)
}

function StatsFilter(props) {
	const {
		clearFilters,
		filters,
		setFilters,
		stats,
	} = props

	const {
		allFiltersEnabled,
		isFiltered,
	} = useMemo(() => {
		return Object.values(filters).reduce((accumulator, value) => {
			if (value) {
				accumulator.isFiltered = true
			} else {
				accumulator.allFiltersEnabled = false
			}

			return accumulator
		}, {
			allFiltersEnabled: true,
			isFiltered: false,
		})
	}, [filters])

	const toggleFilter = useCallback(statID => () => {
		setFilters(previousValue => {
			return {
				...previousValue,
				[statID]: !previousValue[statID]
			}
		})
	}, [setFilters])

	const mapStatFilters = useCallback(([statID, stat]) => {
		return (
			<DropdownOption
				isSelected={filters[statID]}
				key={statID}
				onClick={toggleFilter(statID)}>
				<span>{stat.displayName}</span>
			</DropdownOption>
		)
	}, [filters])

	return (
		<Dropdown label="Stats">
			<DropdownOption
				isSelected={!isFiltered || allFiltersEnabled}
				onClick={clearFilters}>
				<span className="icon is-small">
					<span className="fa-layers fa-fw">
						<FontAwesomeIcon
							icon={['far', 'circle']} />
						<FontAwesomeIcon
							icon="check"
							transform="shrink-8" />
					</span>
				</span>

				<span>
					Show all
				</span>
			</DropdownOption>

			<hr className="dropdown-divider" />

			{Object.entries(stats).map(mapStatFilters)}
		</Dropdown>)
}

function TagsFilter(props) {
	const {
		clearFilters,
		filters,
		setFilters,
		tags,
	} = props

	const {
		allFiltersEnabled,
		isFiltered,
	} = useMemo(() => {
		return Object.values(filters).reduce((accumulator, value) => {
			if (value) {
				accumulator.isFiltered = true
			} else {
				accumulator.allFiltersEnabled = false
			}

			return accumulator
		}, {
			allFiltersEnabled: true,
			isFiltered: false,
		})
	}, [filters])

	const toggleFilter = useCallback(tagID => () => {
		setFilters(previousValue => {
			return {
				...previousValue,
				[tagID]: !previousValue[tagID]
			}
		})
	}, [setFilters])

	const mapTagFilters = useCallback(([tagID, tag]) => {
		return (
			<DropdownOption
				isSelected={filters[tagID]}
				key={tagID}
				onClick={toggleFilter(tagID)}>
				<span className="icon is-small">
					<FontAwesomeIcon
						fixedWidth
						icon={tag.icon} />
				</span>

				<span>{tag.displayName}</span>
			</DropdownOption>
		)
	}, [filters])

	return (
		<Dropdown label="Tags">
			<DropdownOption
				isSelected={!isFiltered || allFiltersEnabled}
				onClick={clearFilters}>
				<span className="icon is-small">
					<span className="fa-layers fa-fw">
						<FontAwesomeIcon
							icon={['far', 'circle']} />
						<FontAwesomeIcon
							icon="check"
							transform="shrink-8" />
					</span>
				</span>

				<span>
					Show all
				</span>
			</DropdownOption>

			<hr className="dropdown-divider" />

			{Object.entries(tags).map(mapTagFilters)}
		</Dropdown>
	)
}

export default function HeldItemsIndexPage(props) {
	const {
		items,
		stats,
		tags,
	} = props

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Held Items',
			url: '/held-items',
		},
	])

	const INITIAL_STATS_FILTERS = useMemo(() => {
		return Object.keys(stats).reduce((accumulator, statID) => {
			accumulator[statID] = false
			return accumulator
		}, {})
	}, [stats])
	const INITIAL_TAGS_FILTERS = useMemo(() => {
		return Object.keys(tags).reduce((accumulator, tagID) => {
			accumulator[tagID] = false
			return accumulator
		}, {})
	}, [tags])
	const [statsFilters, setStatsFilters] = useState(INITIAL_STATS_FILTERS)
	const [tagsFilters, setTagsFilters] = useState(INITIAL_TAGS_FILTERS)

	const clearStatsFilters = useCallback(() => setStatsFilters(INITIAL_STATS_FILTERS), [setStatsFilters])
	const clearTagsFilters = useCallback(() => setTagsFilters(INITIAL_TAGS_FILTERS), [setTagsFilters])

	const activeStatsFilters = useMemo(() => {
		return Object.entries(statsFilters).reduce((accumulator, [statID, isActive]) => {
			if (isActive) {
				accumulator.push(statID)
			}

			return accumulator
		}, [])
	}, [statsFilters])
	const activeTagsFilters = useMemo(() => {
		return Object.entries(tagsFilters).reduce((accumulator, [tagID, isActive]) => {
			if (isActive) {
				accumulator.push(tagID)
			}

			return accumulator
		}, [])
	}, [tagsFilters])

	const mapItems = useCallback(item => {
		if (
			(activeTagsFilters.length && !item.tags.some(tagID => activeTagsFilters.includes(tagID))) ||
			(activeStatsFilters.length && !Object.keys(item.stats).some(statID => activeStatsFilters.includes(statID)))
		) {
			return null
		}

		return (
			<li
				className="column is-one-quarter"
				key={item.id}>
				<Link href={`/unite/held-items/${item.id}`}>
					<a>
						<div className="card is-hoverable">
							<div className="card-image">
								<Image
									alt={`Image of ${item.displayName}`}
									blurDataURL={item.blurDataURL}
									priority
									size={256}
									src={`/images/items/${item.id}.png`} />
							</div>

							<div className="card-content has-text-centered">
								<h3 className="title is-6">{item.displayName}</h3>
							</div>
						</div>
					</a>
				</Link>
			</li>
		)
	}, [
		activeStatsFilters,
		activeTagsFilters,
		items,
	])

	return (
		<Layout title="Held Items">
			<section className="box section">
				<p className="title is-6">
					Filters
				</p>

				<div className="columns is-vcentered">
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
				</div>
			</section>

			<ul className="columns is-multiline">
				{Object.values(items).map(mapItems)}
			</ul>
		</Layout>
	)
}

export async function getStaticProps(context) {
	const [
		{ getItemsProps },
		{ getStatsProps },
		{ getTagsProps },
	] = await Promise.all([
		import('helpers/getItemsProps'),
		import('helpers/getStatsProps'),
		import('helpers/getTagsProps'),
	])

	const [
		{ props: itemsProps },
		{ props: statsProps },
		{ props: tagsProps },
	] = await Promise.all([
		getItemsProps(context),
		getStatsProps(context),
		getTagsProps(context),
	])

	return {
		props: {
			...itemsProps,
			...statsProps,
			...tagsProps,
		},
	}
}
