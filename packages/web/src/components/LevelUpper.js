// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'





export function LevelUpper(props) {
	const {
		className,
		fromLevel,
		toLevel,
	} = props
	const direction = (fromLevel < toLevel) ? 'right' : 'left'

	return (
		<div className={classnames('level-upper', className)}>
			<div className="level-display is-success is-light">
				{fromLevel}
			</div>

			{(fromLevel !== toLevel) && (
				<>
					<div className="level-direction-indicator">
						<FontAwesomeIcon
							fixedWidth
							icon={`angle-double-${direction}`} />
					</div>

					<div className="level-display is-success">
						{toLevel}
					</div>
				</>
			)}
		</div>
	)
}

LevelUpper.defaultProps = {
	className: '',
}

LevelUpper.propTypes = {
	className: PropTypes.string,
	fromLevel: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]).isRequired,
	toLevel: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]).isRequired,
}
