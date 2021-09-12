// Module imports
import NextLink from 'next/link'





// Local imports
import { ExternalLink } from 'components/ExternalLink'





export function Link(node) {
	if (node.href.startsWith('/')) {
		return (
			<NextLink href={node.href}>
				<a>{node.children}</a>
			</NextLink>
		)
	}

	if (node.href === node.children) {
		const [, videoID] = /^https?:\/\/(?:www\.)?youtu(?:\.be\/|be\.com\/watch\?v=)(.*)/.exec(node.href)

		if (videoID) {
			return (
				<iframe
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					frameBorder={0}
					height={315}
					src={`https://www.youtube.com/embed/${videoID}`}
					title="YouTube video player"
					width={560} />
			)
		}
	}

	return (
		<ExternalLink href={node.href}>
			{node.children}
		</ExternalLink>
	)
}
