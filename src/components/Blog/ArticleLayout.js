// Module imports
import PropTypes from 'prop-types'





// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { LeftNav } from 'components/Blog/LeftNav'





export function ArticleLayout(props) {
	const {
		children,
		description,
		openGraph,
		tableOfContents,
		title,
	} = props

	return (
		<BaseLayout
			description={description}
			openGraph={openGraph}
			title={`${title} | Blog`}>
			<div className="columns">
				<div className="column is-one-quarter">
					<LeftNav tableOfContents={tableOfContents} />
				</div>

				<div className="column is-three-quarters">
					{children}
				</div>
			</div>
		</BaseLayout>
	)
}

const tableOfContentsNodeShape = PropTypes.shape({
	label: PropTypes.string.isRequired,
	slug: PropTypes.string.isRequired,
})
tableOfContentsNodeShape.children = PropTypes.arrayOf(tableOfContentsNodeShape).isRequired,

ArticleLayout.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.string.isRequired,
	openGraph: PropTypes.object.isRequired,
	tableOfContents: PropTypes.shape({
		children: PropTypes.arrayOf(tableOfContentsNodeShape).isRequired,
		root: PropTypes.bool.isRequired,
	}),
	title: PropTypes.string.isRequired,
}
