// Module imports
import {
	useCallback,
	useMemo,
} from 'react'
import Link from 'next/link'





// Local imports
import { Layout } from 'components/Blog/Layout'
import { PageHeader } from 'components/PageHeader'
import { PublishedAt } from 'components/Blog/PublishedAt'





function sortArticles (a, b) {
	const articleADate = new Date(a.publishedAt)
	const articleBDate = new Date(b.publishedAt)

	if (articleADate < articleBDate) return 1

	if (articleADate > articleBDate) return -1

	return 0
}

export default function BlogIndexPage(props) {
	const { articles } = props

	const mapArticles = useCallback(article => {
		const {
			publishedAt,
			slug,
			summary,
			title,
		} = article

		return (
			<li
				className="column is-half"
				key={slug}>
				<article className="box media">
					<div className="media-left">
						<PublishedAt
							layout="block"
							timestamp={publishedAt} />
					</div>

					<div className="media-content">
						<h3>
							<Link href={`/blog/${slug}`}>
								<a className="has-text-weight-bold">{title}</a>
							</Link>
							{' '}
						</h3>

						<div className="content">
							<p>{summary}</p>

							<p>
								<Link href={`/blog/${slug}`}>
									<a className="has-text-weight-bold">Read more...</a>
								</Link>
							</p>
						</div>
					</div>
				</article>
			</li>
		)
	}, [articles])

	const sortedArticles = useMemo(() => {
		return [...articles].sort(sortArticles)
	}, [articles])

	const renderedArticles = useMemo(() => {
		return sortedArticles.map(mapArticles)
	}, [
		mapArticles,
		sortedArticles,
	])

	return (
		<Layout
			description="Keep up with the latest news from Pokébag about all of the Pokémon games!"
			title="Blog">
			<PageHeader>
				<h2 className="title">Latest Articles</h2>
			</PageHeader>

			<ul className="columns is-multiline">
				{renderedArticles}
			</ul>
		</Layout>
	)
}

export async function getStaticProps() {
	const { getArticlesProps } = await import('helpers/getArticlesProps')

	return getArticlesProps()
}
