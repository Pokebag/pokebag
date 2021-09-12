// Module imports
import { useCallback } from 'react'
import PropTypes from 'prop-types'





// Constants
const REACTION_EMOJI = [
	{
		description: 'I love it!',
		emoji: '❤️',
	},
	{
		description: 'Too funny!',
		emoji: '🥳',
	},
	{
		description: 'Too funny!',
		emoji: '🤣',
	},
	{
		description: 'Bravo!',
		emoji: '👏',
	},
]





export function Reactions(props) {
	const {
		onReactionClick,
		reactions = {
			'❤️': 0,
			'🤣': 0,
			'👏': 0,
		},
	} = props

	const handleClick = useCallback(event => {
		const { name: emoji } = event.target

		onReactionClick(emoji)
	}, [])

	const mapEmoji = useCallback(emojiData => {
		const {
			description,
			emoji,
		} = emojiData
		const reactionCount = reactions?.[emoji] || 0

		return (
			<li
				className="column is-narrow"
				key={emoji}>
				<button
					className="button has-tooltip-arrow is-rounded"
					data-tooltip={description}
					name={emoji}
					onClick={handleClick}>
					{Boolean(reactionCount) && (
						<div className="is-rounded mr-1 tag">
							{reactionCount}
						</div>
					)}

					{emoji}

					<span className="is-sr-only">{description}</span>
				</button>
			</li>
		)
	}, [
		handleClick,
		reactions,
	])

	return (
		<aside>
			<hr />

			<div className="columns is-vcentered">
				<p className="column">
					<strong>If you enjoyed the article, leave a reaction!</strong>
				</p>

				<ul className="column columns is-narrow">
					{REACTION_EMOJI.map(mapEmoji)}
				</ul>
			</div>
		</aside>
	)
}

Reactions.defaultProps = {
	reactions: null,
}

Reactions.propTypes = {
	onReactionClick: PropTypes.func.isRequired,
	reactions: PropTypes.object,
}
