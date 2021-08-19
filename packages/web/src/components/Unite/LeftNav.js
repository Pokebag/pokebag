// Module imports
import { useCallback } from 'react'
import classnames from 'classnames'
import Link from 'next/link'





export function LeftNav(props) {
  const {
		activeItem,
		items,
		pokemon = [
			'Charizard',
			'Crustle',
		],
	} = props

	const mapItems = useCallback(item => {
		return (
			<li key={item.id}>
				<Link href={`/unite/held-items/${item.id}`}>
					<a
						className={classnames({
							'is-active': activeItem === item.id,
						})}>
						{item.displayName}
					</a>
				</Link>
			</li>
		)
	}, [activeItem])

	const mapPokemon = useCallback(pokemon => {
		return (
			<li key={pokemon}>
				<Link href={`/unite/pokemon/${pokemon}`}>
					<a
						className={classnames({
							'is-active': false,
						})}>
						{pokemon}
					</a>
				</Link>
			</li>
		)
	}, [activeItem])

  return (
    <aside className="box left-nav menu">
      {/* <p className="menu-label">
				Pokémon
      </p>

			<ul className="menu-list">
				<li>
					<Link href="/unite/pokemon">All Pokémon</Link>

					{Boolean(pokemon) && (
						<ul>
							{Object.values(pokemon).map(mapPokemon)}
						</ul>
					)}
				</li>
			</ul> */}

      <p className="menu-label">
        Utilities
      </p>

			<ul className="menu-list">
				<li>
					<Link href="/unite/item-upgrade-calculator">Item Upgrade Calculator</Link>
				</li>
			</ul>

      <p className="menu-label">
        Items
      </p>

      <ul className="menu-list">
				<li>
					<Link href="/unite/held-items">Held Items</Link>

					{Boolean(items) && (
						<ul>
							{Object.values(items).map(mapItems)}
						</ul>
					)}
				</li>

				{/* <li>
					<a>Battle Items</a>
					<ul>
						{Object.values(items).map(mapItems)}
					</ul>
				</li> */}
      </ul>
    </aside>
  )
}
