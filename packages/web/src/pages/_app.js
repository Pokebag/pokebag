// Style imports
import 'scss/lib.scss'
import 'scss/app.scss'





// Module imports
import { DefaultSeo as DefaultSEO } from 'next-seo'





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
			<DefaultSEO
				openGraph={{
					locale: 'en_US',
					site_name: 'Pokébag',
					type: 'website',
					url: 'https://pokeb.ag/',
				}}
				titleTemplate="%s | Pokébag"
				twitter={{
					cardType: 'summary_large_image',
					handle: '@TrezyCodes',
					site: '@PokebagApp',
				}} />

			<div id="application-wrapper">
				<Navbar />
				<Component {...pageProps} />
				<div id="modal-portal-container" />
			</div>
		</>
	)
}

export { reportWebVitals }
