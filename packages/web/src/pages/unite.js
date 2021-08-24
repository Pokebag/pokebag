// Local imports
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function PokemonUniteIndexPage() {
	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		}
	])

	const description = 'Here you\'ll find all of the information that we\'ve compiled on Pokémon UNITE, including Pokémon and item stats. You\'ll also find tools and utilities — such as calculators — to help you better understand the game!'

	return (
		<Layout
			description={description}
			title="Pokémon UNITE Resources"
			useTitleTemplate={false}>
			<PageHeader className="content has-text-centered">
				<Image
					alt="Pokémon UNITE logo"
					height={348}
					priority
					width={640}
					src="/images/logos/pokemon-unite.png" />

				<p>{description}</p>
			</PageHeader>
		</Layout>
	)
}
