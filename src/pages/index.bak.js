// Module imports
import NextImage from 'next/image'





// Local imports
import { Footer } from 'components/Footer'
import { Image } from 'components/Image'
import { PokeSlice } from 'components/Unite/PokeSlice'





export default function HomePage(props) {
	const { articles } = props

	return (
		<>
			<main className="mt-0">
				<div
					className="hero"
					style={{
						backgroundColor: '#5f15ab',
						color: 'white',
					}}>
					<div className="columns is-multiline">
						<div className="column is-half">
							<div className="hero-body">
								<div className="content">
									<p>Welcome to Pokébag!</p>
								</div>
							</div>
						</div>

						<div className="column is-half">
							<PokeSlice
								pokemon={[
									'crustle',
									'pikachu',
									'charizard',
									'snorlax',
								]} />
						</div>
					</div>
				</div>

				<div
					className="hero is-halfheight"
					style={{
						backgroundColor: '#5f15ab',
						color: 'white',
					}}>
					<div className="columns">
						{/* <div className="column is-half">
							<Image
								alt="Pokémon UNITE logo"
								height="348"
								priority
								width="640"
								wrap={false}
								src="/images/games/unite/miscellaneous/legacy-vs-screen.jpeg" />
						</div> */}

						<div className="column is-half is-offset-half">
							<div className="hero-body">
								<div className="content">
									<p>Compare Pokemans!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			<Footer />
		</>
	)
}

export async function getStaticProps() {
	const { getArticlesProps } = await import('helpers/getArticlesProps')

	return getArticlesProps()
}
