// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





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

					<div className="column is-offset-one-quarter is-one-quarter">
						<p className="title is-5">Social</p>

						<ul>
							<li>
								<a href="https://twitter.com/TrezyCodes">
									<FontAwesomeIcon
										fixedWidth
										icon={['fab', 'twitter']} />

									{' Twitter'}
								</a>
							</li>
							<li>
								<a href="https://github.com/trezy/pokebag">
									<FontAwesomeIcon
										fixedWidth
										icon={['fab', 'github']} />

									{' Github'}
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
