// Module imports
import classNames from 'classnames'
import NextImage from 'next/image'
import PropTypes from 'prop-types'





export function Image(props) {
	const {
		className,
		size,
	} = props

	const nextImageProps = {
		placeholder: 'blur',
		layout: 'intrinsic',
		...props,
	}
	delete nextImageProps.className
	delete nextImageProps.size

	return (
		<figure className={classNames(`image`, `is-${size}x${size}`, className)}>
			<NextImage
				{...props}
				height={size}
				width={size} />
		</figure>
	)
}

Image.propTypes = {
	size: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
}
