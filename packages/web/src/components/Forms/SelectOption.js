// Module imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import PropTypes from 'prop-types'





// Local imports
import { Button } from 'components/Button'






export function SelectOption(props) {
	const {
		children,
		isSelected,
		onClick,
		showCircle,
	} = props

	return (
		<Button
			className="dropdown-item"
			onClick={onClick}>
			{children}

			<span className="icon is-small ml-auto">
				<span
					className={classnames({
						'fa-layers': true,
						'fa-fw': true,
						'has-text-success': isSelected,
					})}>
					{showCircle && (
						<FontAwesomeIcon icon={['far', 'circle']} />
					)}

					{isSelected && (
						<FontAwesomeIcon
							icon="check"
							transform="shrink-8" />
					)}
				</span>
			</span>
		</Button>
	)
}

SelectOption.defaultProps = {
	isSelected: false,
	onClick: () => {},
	showCircle: false,
}

SelectOption.propTypes = {
	children: PropTypes.node.isRequired,
	isSelected: PropTypes.bool,
	onClick: PropTypes.func,
	showCircle: PropTypes.bool,
}
