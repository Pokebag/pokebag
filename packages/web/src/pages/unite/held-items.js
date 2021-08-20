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

	const initialFilters = useMemo(() => {
		return Object.keys(TAG_DATA).reduce((accumulator, tagID) => {
			accumulator[tagID] = false
			return accumulator
		}, {})
	}, [])
	const [filters, setFilters] = useState(initialFilters)

	const {
		activeFilters,
		allFiltersEnabled,
		isFiltered,
	} = useMemo(() => {
		const localActiveFilters = Object.entries(filters).reduce((accumulator, [filterID, isActive]) => {
			if (isActive) {
				accumulator.push(filterID)
			}
			return accumulator
		}, [])

		return {
			activeFilters: localActiveFilters,
			allFiltersEnabled: (localActiveFilters.length === Object.keys(filters).length),
			isFiltered: Boolean(localActiveFilters.length),
		}
	}, [filters])

	const clearFilters = useCallback(() => setFilters(initialFilters), [setFilters])

	const toggleFilter = useCallback(tagID => () => {
		setFilters(previousValue => {
			return {
				...previousValue,
				[tagID]: !previousValue[tagID]
			}
		})
	}, [setFilters])

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
		filters,
		items,
	])

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
		<Layout title="Held Items">
			<section className="box section">
				<p className="title is-6">
					Filters
				</p>

				<div className="columns is-vcentered">
					<div className="column">
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
