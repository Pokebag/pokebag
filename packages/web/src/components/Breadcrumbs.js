// Module imports
import { useCallback } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import shallow from 'zustand/shallow'





// Local imports
import { useStore } from 'hooks/useStore'





export function Breadcrumbs() {
	const {
		breadcrumbs,
	} = useStore(state => ({
		breadcrumbs: state.breadcrumbs,
	}), shallow)

	const mapBreadcrumbs = useCallback((breadcrumb, index, breadcrumbsArray) => {
		const isCurrentPage = index === (breadcrumbsArray.length - 1)

		return (
			<li
				className={classnames({
					'is-active': isCurrentPage,
				})}
				key={breadcrumb.label}>
				<Link href={breadcrumb.url}>
					<a aria-current={isCurrentPage ? 'page' : null}>
						{breadcrumb.label}
					</a>
				</Link>
			</li>
		)
	}, [])

	if (breadcrumbs.length <= 1) {
		return null
	}

	return (
		<nav
			aria-label="breadcrumbs"
			className="box breadcrumb">
			<ul>
				{breadcrumbs.map(mapBreadcrumbs)}
			</ul>
		</nav>
	)
}
