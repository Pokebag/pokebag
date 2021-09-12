// Module imports
import PropTypes from 'prop-types'





// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { LeftNav } from 'components/Unite/LeftNav'





export function Layout(props) {
	const {
		activeItem,
		children,
		description,
		openGraph,
		useTitleTemplate,
	} = props

	let title = `${props.title} | Pokémon UNITE`

	if (!useTitleTemplate) {
		title = props.title
	}

	return (
		<BaseLayout
			description={description}
			openGraph={openGraph}
			title={title}>
			<div className="columns">
				<div className="column is-one-quarter">
					<LeftNav activeItem={activeItem} />
				</div>

				<div className="column is-three-quarters">
					<Breadcrumbs />

					{children}
				</div>
			</div>
		</BaseLayout>
	)
}

Layout.defaultProps = {
	activeItem: null,
	openGraph: null,
	useTitleTemplate: true,
}

Layout.propTypes = {
	activeItem: PropTypes.string,
	children: PropTypes.node.isRequired,
	description: PropTypes.string.isRequired,
	openGraph: PropTypes.object,
	title: PropTypes.string.isRequired,
	useTitleTemplate: PropTypes.bool,
}
