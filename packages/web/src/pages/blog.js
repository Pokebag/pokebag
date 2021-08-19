// Module imports
import { useCallback } from 'react'
import Link from 'next/link'





// Local imports
import { Layout } from 'components/Blog/Layout'
import { PageHeader } from 'components/PageHeader'
import { PublishedAt } from 'components/Blog/PublishedAt'





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

	return (
		<Layout>
			<PageHeader>
				<h2 className="title">Latest Articles</h2>
			</PageHeader>

			<ul className="columns is-multiline">
				{articles.map(mapArticles)}
			</ul>
		</Layout>
	)
}

export async function getStaticProps() {
	const { getArticlesProps } = await import('helpers/getArticlesProps')

	return getArticlesProps()
}
