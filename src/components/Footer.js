// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'





// Local imports
import { ExternalLink } from 'components/ExternalLink'





export function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="columns">
					<div className="column content is-one-half">
						<p><strong>Pokébag</strong> by <a href="https://trezy.com">Trezy</a>. Source code is licensed <a href="https://opensource.org/licenses/BSD-3-Clause">3-Clause BSD</a>. The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.</p>

						<p><small>Pokébag isn’t endorsed by Nintendo and doesn’t reflect the views or opinions of Nintendo or anyone officially involved in producing or managing Pokémon Unite.</small></p>

						<p><small>Pokémon Unite and Pokémon are trademarks or registered trademarks of Nintendo.</small></p>
					</div>

					<div className="column is-offset-one-fifth is-one-fifth">
						<p className="title is-5">Social</p>

						<ul>
							<li>
								<ExternalLink href="https://twitter.com/PokebagApp">
									<FontAwesomeIcon
										fixedWidth
										icon={['fab', 'twitter']} />

									{' Twitter'}
								</ExternalLink>
							</li>
							<li>
								<ExternalLink href="https://github.com/Pokebag/pokebag">
									<FontAwesomeIcon
										fixedWidth
										icon={['fab', 'github']} />

									{' Github'}
								</ExternalLink>
							</li>
						</ul>
					</div>

					<div className="column is-one-fifth">
						<p className="title is-5">Legal</p>

						<ul>
							<li>
								<Link href="/legal/terms-of-service">
									{'Terms of Service'}
								</Link>
							</li>

							<li>
								<Link href="/legal/privacy-policy">
									{'Privacy Policy'}
								</Link>
							</li>

							<li>
								<Link href="/legal/cookie-policy">
									{'Cookie Policy'}
								</Link>
							</li>

							<li>
								<Link href="/legal/code-of-conduct">
									{'Code of Conduct'}
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
