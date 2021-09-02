// Module imports
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





export function LeftNav() {
	const Router = useRouter()

	return (
		<aside className="box left-nav menu">
			{/* <p className="menu-label">
				Pokémon
			</p>

			<ul className="menu-list">
				<li>
					<Link href="/unite/pokemon">All Pokémon</Link>
				</li>
			</ul> */}

			<p className="menu-label">
				Utilities
			</p>

			<ul className="menu-list">
				<li>
					<Link href="/unite/item-upgrade-calculator">
						<a
							className={classnames({
								'is-active': Router.pathname === '/unite/item-upgrade-calculator',
							})}>
							Item Upgrade Calculator
						</a>
					</Link>
				</li>
			</ul>

			<p className="menu-label">
				Items
			</p>

			<ul className="menu-list">
				<li>
					<Link href="/unite/held-items">
						<a
							className={classnames({
								'is-active': Router.pathname.startsWith('/unite/held-items'),
							})}>
								Held Items
						</a>
					</Link>
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
