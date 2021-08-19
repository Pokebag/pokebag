// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import classnames from 'classnames'





// Local imports
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





// Constants
const TAG_DATA = {
	attack: {
		className: 'is-danger',
		displayName: 'Attack',
	},
	defense: {
		className: 'is-info',
		displayName: 'Defense',
	},
	score: {
		className: 'is-success',
		displayName: 'Score',
	},
}





export default function HeldItemPage(props) {
	const {
		item,
		items,
		stats,
	} = props

	const itemStats = useMemo(() => {
		return Array(30).fill(null).map((_, index) => {
			return Object.entries(item.stats).reduce((accumulator, [statID, statData]) => {
				const {
					formula,
					type,
				} = statData

				accumulator[statID] = eval(formula.replace(/\{lvl\}/, (index + 1))).toString().replace(/\.0+$/, '')

				if (type === 'percentage') {
					accumulator[statID] += '%'
				}

				return accumulator
			}, {})
		})
	}, [item.stats]);

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Held Items',
			url: '/unite/held-items',
		},
		{
			label: item.displayName,
			url: `/unite/held-items/${item.id}`,
		},
	])

	const mapLevels = useCallback((levelStats, levelIndex) => {
		const level = levelIndex + 1

		return (
			<div className="box media">
				<div className="media-left">
					<div className="level-display">{level}</div>
				</div>

				<div className="media-content">
					<ul class="stat-blocks">
						{Object.entries(levelStats).map(([statID, value]) => (
							<li
								className="notification stat-block"
								key={`${level}:${statID}`}>
								<span className="stat-label">
									{stats[statID]?.displayName || statID}
								</span>

								{value}
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	})

	const mapTags = useCallback(tag => {
		const tagData = TAG_DATA[tag]

		return (
			<span
				className={classnames('tag', tagData.className)}
				key={tag}>
				{tagData.displayName}
			</span>
		)
	}, [TAG_DATA])

	return (
		<Layout
			activeItem={item.id}
			items={items}>
			<header className="box section">
				<div className="columns is-vcentered">
					<div className="column is-narrow">
						<Image
							alt={`Image of ${item.displayName}`}
							blurDataURL={item.blurDataURL}
							priority
							size={128}
							src={`/images/items/${item.id}.png`} />
					</div>

					<div className="column">
						<h2 className="title">{item.displayName}</h2>
						<p className="subtitle">{item.description}</p>

						<div className="tags">
							{item.tags.map(mapTags)}
						</div>
					</div>
				</div>
			</header>

			{itemStats.map(mapLevels)}
		</Layout>
	)
}

export async function getStaticPaths() {
	const { getItemsPaths } = await import('helpers/getItemsPaths')

	return getItemsPaths()
}

export async function getStaticProps(context) {
	const { params } = context

	const [
		{ getItemsProps },
		{ getStatsProps },
	] = await Promise.all([
		import('helpers/getItemsProps'),
		import('helpers/getStatsProps'),
	])

	const [
		{ props: itemsProps },
		{ props: statsProps },
	] = await Promise.all([
		getItemsProps(context),
		getStatsProps(context),
	])

	return {
		props: {
			item: itemsProps.items[params.itemID],
			...itemsProps,
			...statsProps,
		},
	}
}
