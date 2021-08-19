// Module imports
import PropTypes from 'prop-types'





// Local imports
import { Image } from 'components/Image'





export function PokeSlice(props) {
	const { pokemon } = props

	return (
		<ul className="pokeslice-container">
			{pokemon.map(mon => (
				<li className={`is-${mon} pokeslice`}>
					<div className="pokeslice-background" />

					<Image
						alt={mon}
						layout="fixed"
						size={259}
						src={`/images/games/unite/pokemon/${mon}.png`} />
				</li>
			))}
		</ul>
	)
}

PokeSlice.propTypes = {
	pokemon: PropTypes.arrayOf(
		PropTypes.oneOf([
			'absol',
			'alolan-ninetales',
			'charizard',
			'cinderace',
			'cramorant',
			'crustle',
			'eldegoss',
			'garchomp',
			'gardevoir',
			'gengar',
			'greninja',
			'lucario',
			'machamp',
			'mr-mime',
			'pikachu',
			'slowbro',
			'snorlax',
			'talonflame',
			'venusaur',
			'wigglytuff',
			'zeraora',
		])
	)
}
