// Module imports
import { useCallback } from 'react'





export function TagList(props) {
	const { tags } = props

	const mapTags = useCallback(tag => (
		<li
			className="tag"
			key={tag}>
			{tag}
		</li>
	))

	return (
		<ul className="tags">
			{tags.map(mapTags)}
		</ul>
	)
}
