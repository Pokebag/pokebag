// Local imports
import { Image } from 'components/Image'
import { BaseLayout } from 'components/BaseLayout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





export default function PokemonGoIndexPage() {
	useBreadcrumbs([
		{
			label: 'Pokémon GO',
			url: '/go',
		}
	])

	return (
		<BaseLayout>
			<PageHeader className="has-text-centered">
				<Image
					alt="Pokémon GO logo"
					height={189}
					priority
					width={300}
					src="/images/games/go/logo.png" />
			</PageHeader>
		</BaseLayout>
	)
}
