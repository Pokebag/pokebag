// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
	useCallback,
	useRef,
	useState,
} from 'react'





export function Dropdown(props) {
	const {
		children,
		label,
	} = props
	const [isOpen, setIsOpen] = useState(false)
	const hoverIntentTimerID = useRef(null)

	const close = useCallback(() => {
		setIsOpen(false)
	}, [setIsOpen])

	const startHoverIntentTimer = useCallback(() => {
		hoverIntentTimerID.current = setTimeout(close, 1000)
	}, [close])

	const stopHoverIntentTimer = useCallback(() => {
		clearTimeout(hoverIntentTimerID.current)
	}, [close])

	const toggleIsOpen = useCallback(() => {
		setIsOpen(previousValue => !previousValue)
	}, [setIsOpen])

	return (
		<div
			className={classnames({
				dropdown: true,
				'is-active': isOpen,
			})}
			onMouseOut={startHoverIntentTimer}
			onMouseOver={stopHoverIntentTimer}>
			<button
				aria-controls="dropdown-menu"
				aria-haspopup="true"
				className="button"
				onClick={toggleIsOpen}
				type="button">
				<span>{label}</span>
				<span className="icon is-small">
					<FontAwesomeIcon
						fixedWidth
						icon="angle-down" />
				</span>
			</button>

			<div className="dropdown-menu" id="dropdown-menu" role="menu">
				<div className="dropdown-content">
					{children}
				</div>
			</div>
		</div>
	)
}

Dropdown.propTypes = {
	children: PropTypes.node.isRequired,
	label: PropTypes.string.isRequired,
}
