// Module imports
import { useCallback } from 'react'
import classnames from 'classnames'





// Local imports
import { Image } from 'components/Image'
import { Layout } from 'components/Layout'





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





export default function ItemPage(props) {
	const {
		item,
		items,
		stats,
	} = props

	const mapStats = useCallback((levelStats, levelIndex) => {
		const level = levelIndex + 1
		const statCount = Object.keys(levelStats).length

		if (!statCount) {
			return (
				<tr key={level}>
					<th>{level}</th>
					<td colSpan="2">No information available yet.</td>
				</tr>
			)
		}

		return Object.entries(levelStats).map(([statID, value], statIndex) => (
			<tr key={`${level}:${statID}`}>
				{(statIndex === 0) && (
					<th rowSpan={statCount}>{level}</th>
				)}

				<td>{stats[statID]?.displayName || statID}</td>
				<td>{value}</td>
			</tr>
		))
	}, [stats])

	const mapTags = useCallback(tag => {
		const tagData = TAG_DATA[tag]

		return (
			<span
				className={classnames('tag', tagData.className)}
				key={tag}>
				{tagData.displayName}
			</span>
		)
	}, [])

	return (
		<Layout
			activeItem={item.id}
			items={items}>
			<header className="hero">
				<div className="hero-body">
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

							{Boolean(item.tags.length) && (
								<div className="tags">
									{item.tags.map(mapTags)}
								</div>
							)}
						</div>
					</div>
				</div>
			</header>

			<section className="section">
				<table className="table is-bordered is-fullwidth">
					<thead>
						<tr>
							<th>Level</th>
							<th colSpan="2">Bonus</th>
						</tr>
					</thead>

					<tbody>
						{item.stats.map(mapStats)}
					</tbody>
				</table>
			</section>
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
