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
	const initialFilters = useMemo(() => {
		return Object.keys(TAG_DATA).reduce((accumulator, tagID) => {
			accumulator[tagID] = false
			return accumulator
		}, {})
	})
	const [filters, setFilters] = useState(initialFilters)

	const isFiltered = useMemo(() => Object.values(filters).every(value => !value), [filters])

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

	const clearFilters = useCallback(() => setFilters(initialFilters), [setFilters])

	const toggleFilter = useCallback(tagID => () => {
		setFilters(previousValue => {
			return {
				...previousValue,
				[tagID]: !previousValue[tagID]
			}
		})
	}, [setFilters])

	const mapItems = useCallback(item => (
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
	), [items])

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
								isSelected={isFiltered}
								onClick={clearFilters}>
								<span className="icon is-small">
									<span className="fa-layers fa-fw">
										<FontAwesomeIcon
											icon={['far', 'circle']} />
										<FontAwesomeIcon
											icon="check"
											// inverse
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
