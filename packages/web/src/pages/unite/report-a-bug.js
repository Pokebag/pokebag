// Local imports
import { Form } from 'components/Forms/Form'
import { IDSelect } from 'components/Unite/ReportABug/IDSelect'
import { DescriptionInput } from 'components/Unite/ReportABug/DescriptionInput'
import { Layout } from 'components/Unite/Layout'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { TypeSelect } from 'components/Unite/ReportABug/TypeSelect'





export default function PokemonIndexPage(props) {
	const {
		items,
		pokemon,
	} = props

	return (
		<Layout title="Pokémon">
			<Form
				initialValues={{
					'entity-id': null,
					'entity-type': null,
				}}>
				<section className="box section">
					<TypeSelect />

					<IDSelect
						heldItems={items}
						pokemon={pokemon} />

					<DescriptionInput />
				</section>
			</Form>
		</Layout>
	)
}

export async function getStaticProps(context) {
	const [
		{ getHeldItemsProps },
		{ getPokemonProps },
	] = await Promise.all([
		import('helpers/getHeldItemsProps'),
		import('helpers/getPokemonProps'),
	])

	const [
		{ props: heldItemProps },
		{ props: pokemonProps },
	] = await Promise.all([
		getHeldItemsProps(context),
		getPokemonProps(context),
	])

	return {
		props: {
			...heldItemProps,
			...pokemonProps,
		},
	}
}
