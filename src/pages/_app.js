// Style imports
import 'scss/lib.scss'
import 'scss/app.scss'





// Module imports
import { DefaultSeo as DefaultSEO } from 'next-seo'





// Local imports
import { AuthContextProvider } from 'contexts/AuthContext'
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
		<AuthContextProvider>
			<DefaultSEO
				openGraph={{
					locale: 'en_US',
					site_name: 'Pokébag',
					title: 'Pokébag',
					type: 'website',
					url: 'https://pokeb.ag/',
				}}
				titleTemplate="%s | Pokébag"
				twitter={{
					handle: '@TrezyCodes',
					site: '@PokebagApp',
				}} />

			<div id="application-wrapper">
				<Navbar />
				<Component {...pageProps} />
				<div id="modal-portal-container" />
			</div>
		</AuthContextProvider>
	)
}

export { reportWebVitals }
