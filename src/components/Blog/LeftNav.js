// Module imports
import { useCallback } from 'react'
import classnames from 'classnames'





export function LeftNav(props) {
  const { tableOfContents } = props

	const mapSecondLevelHeading = useCallback((headingNode, index) => {
		const {
			label,
			slug,
		} = headingNode

		return (
			<li key={index}>
				<a href={`#${slug}`}>{label}</a>
			</li>
		)
	}, [])

	const mapFirstLevelHeading = useCallback((headingNode, index) => {
		const {
			label,
			slug,
		} = headingNode

		return (
      <ul
				className="menu-list"
				key={index}>
				<li>
					<a href={`#${slug}`}>{label}</a>

					{Boolean(headingNode.children.length) && (
						<ul>
							{headingNode.children.map(mapSecondLevelHeading)}
						</ul>
					)}
				</li>
      </ul>
		)
	}, [])

  return (
    <aside className="box left-nav menu">
      <p className="menu-label">
        Table of Contents
      </p>

			{tableOfContents.children.map(mapFirstLevelHeading)}
    </aside>
  )
}
