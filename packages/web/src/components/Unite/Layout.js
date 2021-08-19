// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { LeftNav } from 'components/Unite/LeftNav'
import { PageHeader } from 'components/PageHeader'





export function Layout(props) {
	const {
		activeItem,
		children,
		content,
		image,
		items,
		subtitle,
		title,
	} = props

	return (
		<BaseLayout>
			<div className="columns">
				<div className="column is-one-quarter">
					<LeftNav
						activeItem={activeItem}
						items={items} />
				</div>

				<div className="column is-three-quarters">
					<Breadcrumbs
						crumbs={[
							{
								label: 'Pokémon UNITE',
								url: '/unite',
							},
							{
								label: 'Pokémon UNITE',
								url: '/unite',
							},
						]} />

					{children}
				</div>
			</div>
		</BaseLayout>
	)
}
