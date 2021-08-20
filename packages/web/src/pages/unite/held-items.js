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





// Constants
const TAG_DATA = {
	attack: {
		displayName: 'Attack',
		icon: 'bolt',
	},
	defense: {
		displayName: 'Defense',
		icon: 'shield-alt',
	},
	score: {
		displayName: 'Score',
		icon: 'futbol',
	},
	other: {
		displayName: 'Other',
		icon: 'ellipsis-h',
	},
}
const INITIAL_TAGS_FILTERS = Object.keys(TAG_DATA).reduce((accumulator, tagID) => {
	accumulator[tagID] = false
	return accumulator
}, {})





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

function TagsFilter(props) {
	const {
		filters,
		setFilters,
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

	const clearFilters = useCallback(() => setFilters(INITIAL_TAGS_FILTERS), [setFilters])

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

			{Object.entries(TAG_DATA).map(mapTagFilters)}
		</Dropdown>
	)
}

export default function HeldItemsIndexPage(props) {
	const { items } = props

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

	const [tagsFilters, setTagsFilters] = useState(INITIAL_TAGS_FILTERS)

	const {
		activeFilters,
		isFiltered,
	} = useMemo(() => {
		const localActiveFilters = Object.entries(tagsFilters).reduce((accumulator, [tagID, isActive]) => {
			if (isActive) {
				accumulator.push(tagID)
			}

			return accumulator
		}, [])

		return {
			activeFilters: localActiveFilters,
			isFiltered: Boolean(localActiveFilters.length),
		}
	}, [tagsFilters])

	const mapItems = useCallback(item => {
		if (!isFiltered || item.tags.some(tagID => activeFilters.includes(tagID))) {
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
		}

		return null
	}, [
		tagsFilters,
		items,
	])

	return (
		<Layout title="Held Items">
			<section className="box section">
				<p className="title is-6">
					Filters
				</p>

				<div className="columns is-vcentered">
					<div className="column">
						<TagsFilter
							filters={tagsFilters}
							setFilters={setTagsFilters} />
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
	] = await Promise.all([
		import('helpers/getItemsProps'),
	])

	const [
		{ props: itemsProps },
	] = await Promise.all([
		getItemsProps(context),
	])

	return {
		props: {
			...itemsProps,
		},
	}
}
