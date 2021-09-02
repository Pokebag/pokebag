// Module imports
import {
	Fragment,
	useCallback,
	useMemo,
	useState,
} from 'react'
import classnames from 'classnames'





// Local imports
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { LevelUpper } from 'components/LevelUpper'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function HeldItemPage(props) {
	const {
		item,
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
			url: '/unite/held-items',
		},
		{
			label: item.displayName,
			url: `/unite/held-items/${item.id}`,
		},
	])

	const [selectedLevel, setSelectedLevel] = useState('1')

	const description = useMemo(() => {
		if (!item.special) {
			return {}
		}

		const replacements = []

		return item.special.description
			.replace(/\{(\w+)}/g, (fullMatch, matchKey) => {
				replacements.push((
					<strong>{item.special.boons[selectedLevel][matchKey]}</strong>
				))
				return '||'
			})
			.split('|')
			.map((item, index) => (
				<Fragment key={index}>
					{Boolean(item) && item}
					{!item && replacements.shift()}
				</Fragment>
			))
	}, [
		item,
		selectedLevel,
	])

	const {
		boonLevels,
		itemImageAlt,
		itemImageURL,
		itemStats,
	} = useMemo(() => {
		return {
			boonLevels: Object.keys(item.special.boons),
			itemImageAlt: `Image of ${item.displayName}`,
			itemImageURL: `/images/items/${item.id}.png`,
			itemStats: Array(30).fill(null).map((_, index) => {
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
			}),
		}
	}, [item])

	const mapLevels = useCallback((levelStats, levelIndex) => {
		const level = levelIndex + 1

		return (
			<div
				className="box media"
				key={level}>
				<div className="media-left">
					<div className="level-display">{level}</div>
				</div>

				<div className="media-content">
					<ul className="stat-blocks">
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
		const tagData = tags[tag]

		return (
			<span
				className={classnames('tag', tagData.className)}
				key={tag}>
				{tagData.displayName}
			</span>
		)
	}, [tags])

	return (
		<Layout
			activeItem={item.id}
			description={item.description}
			openGraph={{
				images: [
					{
						alt: itemImageAlt,
						height: 128,
						url: itemImageURL,
						width: 128,
					},
				],
			}}
			title={`Held Items: ${item.displayName}`}>
			<header className="box section">
				<div className="columns is-vcentered">
					<div className="column is-narrow">
						<Image
							alt={itemImageAlt}
							blurDataURL={item.blurDataURL}
							priority
							size={128}
							src={itemImageURL} />
					</div>

					<div className="column">
						<h2 className="title">{item.displayName}</h2>
						<p className="subtitle">{item.description}</p>

						<div className="tags">
							{item.tags.map(mapTags)}
						</div>
					</div>
				</div>

				<section className="content">
					<h3 className="title is-4">Special</h3>
					<p>{description}</p>

					{Boolean(boonLevels) && (
						<LevelUpper
							className="is-fullwidth"
							levels={boonLevels}
							onLevelSelect={setSelectedLevel}
							selectedLevel={selectedLevel} />
					)}
				</section>
			</header>

			{itemStats.map(mapLevels)}
		</Layout>
	)
}

export async function getStaticPaths() {
	const { getHeldItemsPaths } = await import('helpers/getHeldItemsPaths')

	return getHeldItemsPaths()
}

export async function getStaticProps(context) {
	const { params } = context

	const [
		{ getHeldItemsProps },
		{ getStatsProps },
		{ getTagsProps },
	] = await Promise.all([
		import('helpers/getHeldItemsProps'),
		import('helpers/getStatsProps'),
		import('helpers/getTagsProps'),
	])

	const [
		{ props: itemsProps },
		{ props: statsProps },
		{ props: tagsProps },
	] = await Promise.all([
		getHeldItemsProps(context),
		getStatsProps(context),
		getTagsProps(context),
	])

	return {
		props: {
			item: itemsProps.items[params.itemID],
			...statsProps,
			...tagsProps,
		},
	}
}
