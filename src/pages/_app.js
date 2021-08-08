// Style imports
import 'scss/lib.scss'
import 'scss/app.scss'





// Local imports
import { Navbar } from 'components/Navbar'
import { reportWebVitals } from 'helpers/reportWebVitals'
import { useFontawesome } from 'hooks/useFontawesome'





export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

	useFontawesome()

	return (
		<>
			<Navbar />

			<div id="application-wrapper">
				<Component {...pageProps} />
			</div>
		</>
	)
}

export { reportWebVitals }
