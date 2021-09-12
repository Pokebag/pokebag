// Module imports
import { forwardRef } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'





export const Button = forwardRef((props, ref) => {
	const {
		children,
		className,
		isDisabled,
		isStyled,
		onClick,
		style,
		type,
	} = props

	const ariaAttributes = Object.entries(props).reduce((accumulator, [key, value]) => {
		if (key.startsWith('aria-')) {
			accumulator[key] = value
		}
		return accumulator
	}, {})

	const dataAttributes = Object.entries(props).reduce((accumulator, [key, value]) => {
		if (key.startsWith('data-')) {
			accumulator[key] = value
		}
		return accumulator
	}, {})

	return (
		<button
			{...ariaAttributes}
			{...dataAttributes}
			className={classnames(className, {
				button: isStyled,
			})}
			disabled={isDisabled}
			onClick={onClick}
			ref={ref}
			style={style}
			type={type}>
			{children}
		</button>
	)
})

Button.defaultProps = {
	className: null,
	isDisabled: false,
	isStyled: true,
	onClick: undefined,
	style: {},
	type: 'button',
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	isDisabled: PropTypes.bool,
	isStyled: PropTypes.bool,
	onClick: PropTypes.func,
	style: PropTypes.object,
	type: PropTypes.string.isRequired,
}
