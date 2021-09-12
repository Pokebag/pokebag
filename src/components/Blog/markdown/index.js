// Local imports
import { Gallery } from 'components/Gallery'
import { Link } from './Link'
import { Heading } from './Heading'





export const MARKDOWN_COMPONENTS = {
	// Links
	a: Link,

	// Headings
	h3: function Heading3(node) {
		return (
			<Heading
				{...node}
				level={3} />
		)
	},
	h4: function Heading4(node) {
		return (
			<Heading
				{...node}
				level={4} />
		)
	},

	Gallery,
}
