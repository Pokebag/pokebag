// Module imports
import {
	// useCallback,
	// useEffect,
	useMemo,
	// useState,
} from 'react'
// import {
// 	getDatabase,
// 	ref as databaseRef,
// 	onValue as onDatabaseValue,
// } from 'firebase/database'
import { MDXRemote } from 'next-mdx-remote'
import { useRouter } from 'next/router'





// Local imports
// import { database } from 'helpers/firebase'
import { ArticleLayout } from 'components/Blog/ArticleLayout'
import { MARKDOWN_COMPONENTS } from 'components/Blog/markdown'
import { PageHeader } from 'components/PageHeader'
import { PublishedAt } from 'components/Blog/PublishedAt'
// import { Reactions } from 'components/Blog/Reactions'
import { TagList } from 'components/TagList'





export default function ArticlePage(props) {
	const {
		slug,
		source,
		tableOfContents,
	} = props
	const {
		category,
		headerImage,
		keywords,
		publishedAt,
		summary,
		tags,
		title,
	} = source.scope
	const Router = useRouter()

	const twitterCardType = useMemo(() => {
		if (headerImage) {
			return 'summary_large_image'
		}

		return 'summary'
	}, [source])

	// const [reactions, setReactions] = useState({})
	// const reactionsRef = useMemo(() => {
	// 	return database.ref(`article-reactions/${slug}`)
	// }, [slug])

	// const addArticleReaction = useCallback(emoji => {
	// 	fetch(`/api/blog/reactions/${slug}`, {
	// 		body: JSON.stringify({ emoji }),
	// 		'Content-Type': 'application/json',
	// 		method: 'post',
	// 	})
	// }, [slug])

	// const handleReactionsSnapshot = useCallback(snapshot => {
	// 	if (snapshot?.exists()) {
	// 		setReactions(snapshot.val())
	// 	}
	// }, [setReactions])

	// useEffect(() => {
	// 	return reactionsRef.on('value', handleReactionsSnapshot)
	// }, [handleReactionsSnapshot])

	return (
		<ArticleLayout
			description={summary}
			openGraph={{
				title: `${title} | Pokébag`,
				type: 'article',
				description: summary,
				url: Router.asPath,
				article: {
					publishedTime: publishedAt,
					section: category,
					authors: [
						'https://trezy.com/about',
					],
					tags: keywords,
				},
			}}
			tableOfContents={tableOfContents}
			title={title}
			twitter={{
				cardType: twitterCardType,
			}}>
			<article>
				<PageHeader>
					<h2 className="title">{title}</h2>

					<ul>
						<li>
							<TagList tags={tags} />
						</li>

						<li>
							<em><PublishedAt timestamp={publishedAt} /></em>
						</li>
					</ul>
				</PageHeader>

				<section className="box section">
					<div className="content">
						<MDXRemote
							{...source}
							components={MARKDOWN_COMPONENTS} />
					</div>

					{/* <Reactions
						onReactionClick={addArticleReaction}
						reactions={reactions} /> */}
				</section>
			</article>
		</ArticleLayout>
	)
}

export async function getStaticPaths() {
	const { getArticlesPaths } = await import('helpers/getArticlesPaths')

	return getArticlesPaths()
}

export async function getStaticProps(context) {
	const { getArticleProps } = await import('helpers/getArticleProps')

	return getArticleProps(context)
}
