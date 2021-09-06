// Module imports
import { createPortal } from 'react-dom'
import {
	useCallback,
	useEffect,
} from 'react'
import PropTypes from 'prop-types'
import shallow from 'zustand/shallow'





// Local imports
import { useStore } from 'hooks/useStore'





export function Modal(props) {
	const {
		children,
		onClose,
		showClose,
		wrapContent,
	} = props
	const {
		setIsModalOpen,
	} = useStore(state => ({
		setIsModalOpen: state.setIsModalOpen,
	}), shallow)

	const handleClose = useCallback(() => {
		setIsModalOpen(false)
		onClose()
	}, [
		onClose,
		setIsModalOpen,
	])

	const handleEscapeKey = useCallback(event => {
		if (event.key === 'Escape') {
			handleClose()
		}
	}, [handleClose])

	useEffect(() => {
		window.addEventListener('keyup', handleEscapeKey)
		setIsModalOpen(true)
		return () => window.removeEventListener('keyup', handleEscapeKey)
	}, [handleEscapeKey])

	if (typeof window === 'undefined') {
		return null
	}

	return createPortal(
		(
			<div className="modal is-active">
				<div className="modal-background" />

				{wrapContent && (
					<div className="modal-content">{children}</div>
				)}

				{!wrapContent && children}

				{showClose && (
					<button
						aria-label="close"
						className="modal-close is-large"
						onClick={handleClose} />
				)}
			</div>
		),
		document.querySelector('#modal-portal-container')
	)
}

Modal.defaultProps = {
	showClose: true,
	wrapContent: true,
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	onClose: PropTypes.func.isRequired,
	showClose: PropTypes.bool,
	wrapContent: PropTypes.bool,
}
