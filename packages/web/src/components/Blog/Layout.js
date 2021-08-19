// Local imports
import { BaseLayout } from 'components/BaseLayout'





export function Layout(props) {
	const {
		children,
	} = props

	return (
		<BaseLayout>
			{children}
		</BaseLayout>
	)
}
