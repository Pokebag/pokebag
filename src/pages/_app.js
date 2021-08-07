// Style imports
import 'scss/lib.scss'
import 'scss/app.scss'





// Local imports
import { reportWebVitals } from 'helpers/reportWebVitals'
import { useFontawesome } from 'hooks/useFontawesome'





export default function App(props) {
	const {
		Component,
		pageProps,
	} = props

	useFontawesome()

	return (
    <div
      className="container"
      id="application-wrapper">
      {/* <Banner /> */}
      <Component {...pageProps} />
    </div>
	)
}

export { reportWebVitals }
