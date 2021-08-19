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





// Local imports
// import { database } from 'helpers/firebase'
import { ArticleLayout } from 'components/Blog/ArticleLayout'
import { MARKDOWN_COMPONENTS } from 'components/Blog/markdown'
import { PublishedAt } from 'components/Blog/PublishedAt'
// import { Reactions } from 'components/Blog/Reactions'





export default function ArticlePage(props) {
	const {
		slug,
		source,
		tableOfContents,
	} = props
	const {
		publishedAt,
		title,
	} = source.scope
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
		<ArticleLayout tableOfContents={tableOfContents}>
			<article>
				<header className="box hero">
					<div className="hero-body">
						<h2 className="title">{title}</h2>
						<em><PublishedAt timestamp={publishedAt} /></em>
					</div>
				</header>

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
