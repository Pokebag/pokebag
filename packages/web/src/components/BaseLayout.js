// Local imports
import { Footer } from 'components/Footer'





export function BaseLayout(props) {
	const { children } = props

	return (
		<>
			<main className="section">
				<div className="container">
					{children}
				</div>
			</main>

			<Footer />
		</>
	)
}
