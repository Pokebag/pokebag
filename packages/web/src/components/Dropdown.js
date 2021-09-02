// Module imports
import {
	Children,
	cloneElement,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { Button } from 'components/Button'





function createClickHandler(originalClickHandler, additionalHandlers) {
	return event => {
		if (typeof originalClickHandler === 'function') {
			originalClickHandler(event)
		}

		additionalHandlers.forEach(handler => handler())
	}
}

function mapChildren(additionalHandlers) {
	return child => {
		return cloneElement(child, {
			onClick: createClickHandler(child.props.onClick, additionalHandlers),
		})
	}
}

export function Dropdown(props) {
	const {
		className,
		isMultiselect,
		label,
	} = props
	const [isOpen, setIsOpen] = useState(false)
	const hoverIntentTimerID = useRef(null)
	const containerRef = useRef(null)

	const close = useCallback(() => {
		setIsOpen(false)
	}, [setIsOpen])

	const handleForeignClick = useCallback(event => {
		const currentElement = containerRef.current

		if ((currentElement !== event.target) || !currentElement.contains(event.target)) {
			close()
		}
	}, [close])

	const startHoverIntentTimer = useCallback(() => {
		hoverIntentTimerID.current = setTimeout(close, 1000)
	}, [close])

	const stopHoverIntentTimer = useCallback(() => {
		clearTimeout(hoverIntentTimerID.current)
	}, [close])

	const toggleIsOpen = useCallback(() => {
		setIsOpen(previousValue => !previousValue)
	}, [setIsOpen])

	const children = useMemo(() => {
		if (isMultiselect) {
			return props.children
		}

		return Children.map(props.children, mapChildren([close]))
	}, [
		close,
		isMultiselect,
		props.children,
	])

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('click', handleForeignClick)
		} else {
			document.removeEventListener('click', handleForeignClick)
		}

		return () => document.removeEventListener('click', handleForeignClick)
	}, [
		handleForeignClick,
		isOpen,
	])

	return (
		<div
			className={classnames(className, {
				dropdown: true,
				'is-active': isOpen,
			})}
			onMouseOut={startHoverIntentTimer}
			onMouseOver={stopHoverIntentTimer}
			ref={containerRef}>
			<Button
				aria-controls="dropdown-menu"
				aria-haspopup="true"
				onClick={toggleIsOpen}>
				<span>{label}</span>
				<span className="icon is-small">
					<FontAwesomeIcon
						fixedWidth
						icon="angle-down" />
				</span>
			</Button>

			<div className="dropdown-menu" id="dropdown-menu" role="menu">
				<div className="dropdown-content">
					{children}
				</div>
			</div>
		</div>
	)
}

Dropdown.defaultProps = {
	className: '',
	isMultiselect: false,
}

Dropdown.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	isMultiselect: PropTypes.bool,
	label: PropTypes.string.isRequired,
}
