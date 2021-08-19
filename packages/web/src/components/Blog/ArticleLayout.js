// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { LeftNav } from 'components/Blog/LeftNav'





export function ArticleLayout(props) {
	const {
		children,
		tableOfContents,
	} = props

	return (
		<BaseLayout>
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
