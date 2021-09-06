// Module imports
import Link from 'next/link'





// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { Image } from 'components/Image'





export default function HomePage(props) {
	return (
		<BaseLayout
			description="Pokébag aims to provide a great resource for information and tools for all Pokémon games!"
			title="Home">
			<main className="mt-0">
				<div className="box section">
					<div className="columns is-vcentered">
						<div className="column is-5">
							<div className="content">
								<h2 className="title">Your One–Stop–Shop for Pokémon</h2>

								<p>Pokébag aims to provide a great resource for information and tools for <em>all Pokémon games</em>! From the latest patches, to the most recent announcements from the Pokémon Company themselves, we'll keep you up–to–date and in–the–know!</p>

								<p>Learn more in our <Link href="/blog/welcome">very first blog post</Link>.</p>
							</div>
						</div>

						<div className="column is-offset-2 is-5">
							<div className="columns is-multiline is-vcentered">
								<div className="column is-half">
									<Image
										alt="Pokémon UNITE logo"
										height={348}
										priority
										width={640}
										src="/images/logos/pokemon-unite.png" />
								</div>

								<div className="column is-half">
									<Image
										alt="Pokémon GO logo"
										height={189}
										priority
										width={300}
										src="/images/games/go/logo.png" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</BaseLayout>
	)
}

// export async function getStaticProps() {
// 	const { getArticlesProps } = await import('helpers/getArticlesProps')

// 	return getArticlesProps()
// }
