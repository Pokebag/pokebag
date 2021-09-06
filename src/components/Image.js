// Module imports
import classNames from 'classnames'
import NextImage from 'next/image'
import PropTypes from 'prop-types'





export function Image(props) {
	const {
		className,
		height,
		size,
		width,
		wrap,
	} = props

	let nextImageProps = {
		...props
	}

	delete nextImageProps.className
	delete nextImageProps.size
	delete nextImageProps.wrap

	if (!wrap) {
		return (
			<NextImage
				{...nextImageProps}
				height={height || size}
				width={width || size} />
		)
	}

	return (
		<figure className={classNames(`image`, `is-${size || height}x${size || width}`, className)}>
			<NextImage
				{...nextImageProps}
				height={height || size}
				width={width || size} />
		</figure>
	)
}

Image.defaultProps = {
	className: '',
	wrap: true,
}

Image.propTypes = {
	className: PropTypes.string,
	height: PropTypes.number,
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	width: PropTypes.number,
	wrap: PropTypes.bool,
}
