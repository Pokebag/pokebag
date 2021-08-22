// Local imports
import { NextSeo as NextSEO } from 'next-seo'
import { useEffect } from 'react'
import PropTypes from 'prop-types'





// Local imports
import { Footer } from 'components/Footer'





// Constants
const MAX_DESCRIPTION_LENGTH = 300
const MAX_TITLE_LENGTH = 50





export function BaseLayout(props) {
	const {
		children,
		description,
		openGraph,
		title,
	} = props

	useEffect(() => {
		if (title && (title.length > MAX_TITLE_LENGTH)) {
			console.warn(`Page titles should be fewer than 60 characters, preferably closer to 50. This page's title is ${title.length} characters.`)
		}

		if (description) {
			if (description.length > MAX_DESCRIPTION_LENGTH) {
				console.error(`Page description is too long! The description should be 50-300 characters long, but this page's description is ${description.length} characters.`)
			}

			if (description.indexOf('"') !== -1) {
				console.error('Page descriptions shouldn\'t contain double quotes.')
			}
		}
	}, [
		description,
		title,
	])

	return (
		<>
			<NextSEO
				description={description}
				openGraph={openGraph}
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

BaseLayout.defaultProps = {
	openGraph: null,
}

BaseLayout.propTypes = {
	children: PropTypes.node.isRequired,
	description: PropTypes.string.isRequired,
	openGraph: PropTypes.object,
	title: PropTypes.string.isRequired,
}
