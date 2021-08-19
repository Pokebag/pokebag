// Module imports
import classnames from 'classnames'





export function PageHeader(props) {
	const {
		children,
		className,
	} = props

	return (
		<header className="box section">
			<div className={classnames(className)}>
				{children}
			</div>
		</header>
	)
}
