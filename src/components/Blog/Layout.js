// Module imports
import PropTypes from 'prop-types'





// Local imports
import { BaseLayout } from 'components/BaseLayout'





export function Layout(props) {
	const {
		children,
		description,
		title,
	} = props

	return (
		<BaseLayout
			description={description}
			title={title}>
			{children}
		</BaseLayout>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}
