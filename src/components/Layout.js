// Local imports
import { LeftNav } from 'components/LeftNav'





export function Layout(props) {
	const {
		activeItem,
		children,
		items,
	} = props

	return (
		<section className="section">
			<div className="container">
				<div className="columns">
					<div className="column is-one-quarter">
						<LeftNav
							activeItem={activeItem}
							items={items} />
					</div>

					<div className="column is-three-quarters">
						{children}
					</div>
				</div>
			</div>
		</section>
	)
}
