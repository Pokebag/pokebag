// Local imports
import { Footer } from 'components/Footer'
import { NextSeo as NextSEO } from 'next-seo'
import PropTypes from 'prop-types'





export function BaseLayout(props) {
	const {
		children,
		description,
		title,
	} = props

	return (
		<>
			<NextSEO
				description={description}
				title={title} />

			<main className="section">
				<div className="container">
					{children}
				</div>
			</main>

			<Footer />
		</>
	)
}

BaseLayout.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
}
