// Module imports
import {
	Fragment,
	useCallback,
	useMemo,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'





export function LevelUpper(props) {
	const {
		className,
		direction,
		levels,
	} = props
	const sortedLevels = useMemo(() => levels.sort(), [levels])
	const selectedLevel = props.selectedLevel ?? sortedLevels[sortedLevels.length - 1]

	const onLevelSelect = useCallback(event => {
		props.onLevelSelect(event.target.value)
	}, [])

	const mapLevels = useCallback((level, index) => (
		<Fragment key={level}>
			{(index > 0) && (
				<div className="level-direction-indicator">
					<FontAwesomeIcon
						fixedWidth
						icon={`angle-double-${direction}`} />
				</div>
			)}

			<button
				className={classnames({
					button: true,
					'level-display': true,
					'is-light': selectedLevel !== level,
					'is-success': true,
				})}
				onClick={onLevelSelect}
				type="button"
				value={level}>
				{level}
			</button>
		</Fragment>
	), [
		onLevelSelect,
		selectedLevel,
	])

	return (
		<div className={classnames('level-upper', className)}>
			{sortedLevels.map(mapLevels)}
		</div>
	)
}

LevelUpper.defaultProps = {
	className: '',
	direction: 'right',
	onLevelSelect: () => {},
	selectedLevel: null,
}

LevelUpper.propTypes = {
	className: PropTypes.string,
	direction: PropTypes.string,
	onLevelSelect: PropTypes.func,
	levels: PropTypes.arrayOf(
		PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
	).isRequired,
	selectedLevel: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
}
