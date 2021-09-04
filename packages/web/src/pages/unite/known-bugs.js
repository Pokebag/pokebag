// Module imports
import { useCallback, useMemo } from 'react'
import shallow from 'zustand/shallow'





// Local imports
import { Bug } from 'components/Unite/Bug'
import { Layout } from 'components/Unite/Layout'
import { PageHeader } from 'components/PageHeader'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'
import { useStore } from 'hooks/useStore'





export default function KnownBugsPage(props) {
	const { bugs } = props

	const {
		setHeldItems,
		setPokemon,
	} = useStore(state => ({
		setHeldItems: state.unite.setHeldItems,
		setPokemon: state.unite.setPokemon,
	}))

	useMemo(() => {
		setHeldItems(props.items)
		setPokemon(props.pokemon)
	}, [])

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Known Bugs',
			url: '/known-bugs',
		},
	])

	const mapBugs = useCallback(bug => {
		return (
			<Bug
				bug={bug}
				key={bug.id} />
		)
	}, [])

	return (
		<Layout
			description="This page documents all of the Pokémon UNITE bugs known to Pokébag, as well as their status!"
			title="Known Bugs">
			<PageHeader>
				<h2 className="title">
					{'Known Bugs'}
				</h2>
			</PageHeader>

			{bugs.map(mapBugs)}
		</Layout>
	)
}

export async function getStaticProps(context) {
	const [
		{ getPokemonProps },
		{ getHeldItemsProps },
	] = await Promise.all([
		import('helpers/getPokemonProps'),
		import('helpers/getHeldItemsProps'),
	])

	const [
		{ props: heldItemsProps },
		{ props: pokemonProps },
	] = await Promise.all([
		getHeldItemsProps(context),
		getPokemonProps(context),
	])

	return {
		props: {
			...heldItemsProps,
			...pokemonProps,

			bugs: [
				{
					description: 'When a Pokémon gets hit with with Telekinesis, it is teleported to a completely different match and immediately wins.',
					entityType: 'pokemon',
					entityID: 'slowbro',
					id: '12345',
					reports: [
						{
							author: 'Ash Ketchum',
							createdAt: '2021-06-02T05:00:00.000Z',
							id: '1',
						},
						{
							author: 'Professor Oak',
							createdAt: '2021-07-02T05:00:00.000Z',
							id: '2',
						},
						{
							author: 'Misty',
							createdAt: '2021-09-02T05:00:00.000Z',
							id: '3',
						},
						{
							author: 'Brock',
							createdAt: '2021-08-02T05:00:00.000Z',
							id: '4',
						},
					],
					status: 'Active',
					title: 'Crustle Does Donuts',
				},

				{
					description: 'After pinching Zapdos, Crustle pulls into his shell. A fuse pops out of the top of the shell, slowly burning away. Once the fuse reaches its end, Crustle explodes. Everybody dies. Nobody wins.',
					entityType: 'pokemon',
					entityID: 'crustle',
					id: '67890',
					reports: [
						{
							author: 'James',
							createdAt: '2021-07-02T05:00:00.000Z',
							id: '6',
						},
						{
							author: 'Jesse',
							createdAt: '2021-06-02T05:00:00.000Z',
							id: '5',
						},
					],
					status: 'Active',
					title: 'Crustle Literally Becomes a Bomb',
				},
			],
		},
	}
}
