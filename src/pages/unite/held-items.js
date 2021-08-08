// Module imports
import { useCallback } from 'react'
import Link from 'next/link'





// Local imports
import { Image } from 'components/Image'
import { Layout } from 'components/Layout'





export default function HeldItemsIndex(props) {
	const { items } = props

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
		<Layout items={items}>
			<header className="hero">
				<div className="hero-body">
					<h2 className="title">Held Items</h2>
				</div>
			</header>

			<section className="section">
				<ul className="columns is-multiline">
					{Object.values(items).map(mapItems)}
				</ul>
			</section>
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
