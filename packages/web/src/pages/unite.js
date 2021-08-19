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

	return (
		<Layout>
			<PageHeader className="has-text-centered">
				<Image
					alt="Pokémon UNITE logo"
					height={348}
					priority
					width={640}
					src="/images/logos/pokemon-unite.png" />
			</PageHeader>
		</Layout>
	)
}
