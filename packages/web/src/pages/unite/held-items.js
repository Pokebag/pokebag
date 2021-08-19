// Module imports
import { useCallback } from 'react'
import Link from 'next/link'





// Local imports
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





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

	return (
		<Layout title="Held Items">
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
