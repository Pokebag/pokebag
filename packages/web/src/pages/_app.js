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
		<div id="application-wrapper">
			<Navbar />
			<Component {...pageProps} />
			<div id="modal-portal-container" />
		</div>
	)
}

export { reportWebVitals }
