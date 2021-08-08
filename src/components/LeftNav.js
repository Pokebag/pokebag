// Module imports
import { useCallback } from 'react'
import classnames from 'classnames'
import Link from 'next/link'





export function LeftNav(props) {
  const {
		activeItem,
		items,
	} = props

	const mapItemValues = useCallback(item => {
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

  return (
    <aside className="menu">
      <p className="menu-label">
        Items
      </p>

      <ul className="menu-list">
				<li>
					<Link href="/unite/held-items">Held Items</Link>
					<ul>
						{Object.values(items).map(mapItemValues)}
					</ul>
				</li>

				{/* <li>
					<a>Battle Items</a>
					<ul>
						{Object.values(items).map(mapItemValues)}
					</ul>
				</li> */}
      </ul>
    </aside>
  )
}
